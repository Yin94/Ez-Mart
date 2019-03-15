import React from "react";
import { Link } from "react-router-dom";
import styles from "./ClosingTag.css";
export default function ClosingTag({ onClick }) {
  return <Link to='#' className={styles.close} {...{ onClick }} />;
}
