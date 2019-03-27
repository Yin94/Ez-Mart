import React from "react";

export default function NoteItem({ index, deleteNote, value, noteChanged }) {
  return (
    <div>
      <input
        style={{ width: "90%" }}
        type='text'
        value={value}
        onChange={e => noteChanged(e, index)}
      />
      <span
        style={{
          backgroundColor: "red",
          display: "inline-block",
          padding: "5px"
        }}
        onClick={() => deleteNote(index)}>
        X
      </span>
    </div>
  );
}
