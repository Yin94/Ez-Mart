import React from "react";
import styles from "./Button.css";
export default function Button({
  className = "btn primary",
  children,
  ...others
}) {
  className = className.split(" ").map(cName => styles[cName]);
  className = className.join(" ");
  return <button {...{ ...others, className }}>{children} </button>;
}
