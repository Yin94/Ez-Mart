import React from "react";
import styles from "./Gallery.css";

export default function Gallery({ imgList, className, onClick }) {
  const list = imgList.map((img, i) => (
    <button type='button' key={i} onClick={() => onClick(i)}>
      <img className={styles.content} src={imgList[i]} alt='img' />
    </button>
  ));
  return <div className={[styles.container, className].join(" ")}>{list}</div>;
}
