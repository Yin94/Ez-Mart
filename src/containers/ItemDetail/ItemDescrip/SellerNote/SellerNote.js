import React from "react";

export default function SellerNote({ noteList = ["note1", "note2"] }) {
  const list = noteList.map((note, index) => (
    <li style={{ padding: "5px" }} key={index + note}>
      {note}
    </li>
  ));
  return <ul style={{ margin: "20px 0", marginLeft: "20px" }}>{list}</ul>;
}
