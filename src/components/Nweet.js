import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React from "react";
import { useState } from "react/cjs/react.development";
import { db } from "../fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  // 느윗 삭제 이벤트
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 이 느윗을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, "Nweets", `${nweetObj.id}`));
    }
  };

  // 에디트 모드 전환
  const toggleEditing = () => setEditing((prev) => !prev);

  // 수정한 느윗 업데이트
  const onSubmit = async (event) => {
    event.preventDefault();
    const updateNweetRef = doc(db, "Nweets", `${nweetObj.id}`);
    await updateDoc(updateNweetRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  // 느윗 수정
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="느윗을 수정하세요."
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="느윗 업데이트" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>느윗 삭제</button>
              <button onClick={toggleEditing}>느윗 수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
