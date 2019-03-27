import React from "react";
import Button from "../../../UI/Button/Button";
import { timeStampToDate } from "../../../utility/time-convert";
export default function PostBlock({ post, onClick, editPost, deletePost }) {
  const timeStamp = post.lastModifyTime;
  const time = timeStampToDate(timeStamp);

  return (
    <>
      <p>{post.id}</p>
      <p {...{ onClick }}>{post.name}</p>
      <p>{time ? time.toString() : null}</p>
      <div>
        <Button
          onClick={editPost}
          style={{ width: "100%" }}
          className='btn succeed'>
          Edit
        </Button>
        <Button
          onClick={deletePost}
          style={{ width: "100%" }}
          className='btn primary'>
          Delete
        </Button>
      </div>
    </>
  );
}
