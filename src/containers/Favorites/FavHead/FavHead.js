import React from "react";
// import styles from "./FavHead.css";

import SearchBar from "../../../UI/SearchBar/SearchBar";
export default function FavHead() {
  const style = { borderBottom: "1px solid #f70d0b", padding: "10px 0" };
  return <SearchBar containerStyle={style} />;
}
