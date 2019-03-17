import React from "react";
import ListItem from "../ListItem/ListItem";
import styles from "./ItemList.css";

export default function ItemList({ list = [], itemSelected }) {
  const disList = list.map((item, index) => (
    <ListItem itemSelected={() => itemSelected(index)} {...{ item }} />
  ));
  return <div className={styles.container}>{disList}</div>;
}
