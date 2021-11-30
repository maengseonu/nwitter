import React, { useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useHistory } from "react-router";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../fbase";
import { useState } from "react/cjs/react.development";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const auth = getAuth();
  const history = useHistory();
  const onLogOutClick = () => {
    auth.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(db, "Nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="프로필 업데이트" />
      </form>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Profile;
