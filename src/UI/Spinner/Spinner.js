import React from "react";
import styles from "./Spinner.css";
export default function Spinner({ style }) {
  return <div {...{ style }} className={styles["lds-hourglass"]} />;
}
