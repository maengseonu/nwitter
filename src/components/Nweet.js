import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { db, storage } from "../fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

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

  // 느윗 삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 이 느윗을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, "Nweets", `${nweetObj.id}`));
      await deleteObject(ref(storage, nweetObj.attachmentUrl));
    }
  };

  // 에디트 모드 전환
  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="느윗을 수정하세요."
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="느윗 업데이트" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
