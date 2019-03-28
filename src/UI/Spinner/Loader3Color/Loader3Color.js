import React from "react";
import styles from "./Loader3Color.css";
export default function Loader3Color() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%)",
        zIndex: "2"
      }}
      className={styles.loader}
    />
  );
}
