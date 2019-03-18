import React from "react";
import ItemList from "./ItemList/ItemList";
export default function Items({ list, itemSelected, favoriteClicked }) {
  return (
    <div>
      <ItemList {...{ list, itemSelected, favoriteClicked }} />
    </div>
  );
}
