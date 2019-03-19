import React from "react";
import styles from "./FavList.css";
import FavItem from "./FavItem/FavItem";
export default function FavList({ list, deleteItem }) {
  const items = list.map(item => (
    <FavItem
      key={item.id}
      {...{ item }}
      deleteFavItem={() => deleteItem(item.id)}
    />
  ));
  return <div className={styles.container}>{items}</div>;
}
