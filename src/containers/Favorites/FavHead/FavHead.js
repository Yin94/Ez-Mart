import React from "react";

import Button from "../../../UI/Button/Button";
import SearchBar from "../../../UI/SearchBar/SearchBar";
export default function FavHead({ selected, resetSearch }) {
  return (
    <div style={{ borderBottom: "2px solid red" }}>
      <SearchBar searchActivated={selected} />
      <Button
        style={{ width: "20%", height: "40px", margin: "10px 0" }}
        onClick={resetSearch}
        className='btn succeed'>
        reset search
      </Button>
    </div>
  );
}
