import React from "react";
import styles from "./SearchBar.css";
import Button from "../Button/Button";
export default function SearchBar({
  containerStyle,
  type,
  buttonText = "search"
}) {
  const searchGroup =
    type === "navSearch" ? (
      <>
        <input
          style={{ width: "70%" }}
          type='text'
          placeholder='Search..'
          name='search'
        />
        <Button style={{ width: "30%" }}>search</Button>
      </>
    ) : (
      <>
        <input type='text' placeholder='Search..' name='search' />
        <Button>{buttonText}</Button>
      </>
    );
  return (
    <div style={containerStyle} className={styles.searchGroup}>
      {searchGroup}
    </div>
  );
}
