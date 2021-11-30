import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Nweet from "../components/Nweet";
import { db } from "../fbase";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); // 데이터 추가

  const [nweets, setNweets] = useState([]); // 데이터 일기

  const [attachment, setAttachment] = useState(); // 업로드 파일

  // 리얼타임으로 느윗 데이터 읽기
  useEffect(() => {
    const q = query(collection(db, "Nweets"), orderBy("createdAt"));
    onSnapshot(q, (querySnapshot) => {
      const nweetArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNweets(nweetArray);
    });
  }, []);

  // 작성한 느윗 파이어스토어에 추가
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "Nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  // 느윗 작성
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  //업로드 파일 미리보기
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="어떤 생각을 하고 있으세요?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
