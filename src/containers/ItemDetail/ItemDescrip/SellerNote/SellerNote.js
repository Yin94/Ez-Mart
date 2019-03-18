import React from "react";

export default function SellerNote({ notes }) {
  const list = notes.map((note, index) => (
    <li style={{ padding: "5px" }} key={index + note}>
      {note}
    </li>
  ));
  return <ul style={{ margin: "20px 0", marginLeft: "20px" }}>{list}</ul>;
}
