import React from "react";
import styles from "./Gallery.css";

export default function Gallery({ imgList = ["", "", "", "", ""], className }) {
  const list = imgList.map((img, i) => (
    <button key={i}>
      <img
        className={styles.content}
        onClick={() => {
          console.log("object");
        }}
        src={src}
        alt='img'
      />
    </button>
  ));
  return <div className={[styles.container, className].join(" ")}>{list}</div>;
}

const src =
  "https://gd3.alicdn.com/imgextra/i3/210064878/TB2nDO9rH1YBuNjSszeXXablFXa_!!210064878.jpg_50x50.jpg_.webp";
