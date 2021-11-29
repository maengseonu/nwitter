import React from "react";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router";

export default () => {
  const auth = getAuth();
  const history = useHistory();
  const onLogOutClick = () => {
    auth.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
