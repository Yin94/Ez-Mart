import React from "react";
import Button from "../../../UI/Button/Button";

export default function PostBlock({ post, onClick, editPost, deletePost }) {
  return (
    <>
      <p>{post.id}</p>
      <p {...{ onClick }}>{post.name}</p>
      <p>{post.updateTime}</p>
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
