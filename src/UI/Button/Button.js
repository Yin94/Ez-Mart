import React from "react";
import styles from "./Button.css";
export default function Button({ className = "Primary", children, ...others }) {
  return (
    <button className={styles[className]} {...others}>
      {children}{" "}
    </button>
  );
}
