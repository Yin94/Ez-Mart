import React from "react";
import ItemList from "./ItemList/ItemList";
export default function Items({ list, itemSelected }) {
  return (
    <div>
      <ItemList {...{ list, itemSelected }} />
    </div>
  );
}
