import React from "react";
import styles from "./Layout.css";
export default function Layout({ children }) {
  return <div className={styles.LayoutContainer}>{children}</div>;
}
