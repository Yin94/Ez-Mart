import React, { useState } from "react";
import styles from "./SearchBar.css";
import Button from "../Button/Button";
export default function SearchBar({
  containerStyle,
  type,
  buttonText = "search",
  searchActivated
}) {
  const [input, setIntput] = useState("");

  const searchGroup =
    type === "navSearch" ? (
      <>
        <input
          style={{ width: "70%" }}
          type='text'
          placeholder='Search..'
          name='search'
          value={input}
          onChange={e => setIntput(e.target.value)}
          onKeyDown={e => searchActivated(e, input)}
        />
        <Button
          name='searchBtn'
          onClick={e => searchActivated(e, input)}
          style={{ width: "30%" }}>
          Search
        </Button>
      </>
    ) : (
      <>
        <input
          onChange={e => setIntput(e.target.value)}
          onKeyDown={e => searchActivated(e, input)}
          type='text'
          placeholder='Search..'
          name='search'
        />

        <Button name='searchBtn' onClick={e => searchActivated(e, input)}>
          {buttonText}
        </Button>
      </>
    );
  return (
    <div style={containerStyle} className={styles.searchGroup}>
      {searchGroup}
    </div>
  );
}
