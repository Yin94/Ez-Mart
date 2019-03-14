import React from "react";
import styles from "./FavList.css";
import FavItem from "./FavItem/FavItem";
export default function FavList() {
  return (
    <div className={styles.container}>
      <FavItem />
      <FavItem />
      <FavItem />
      <FavItem />
    </div>
  );
}
