import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './ItemList.css';
export default function ItemList({
  list = [],
  itemSelected,
  userfavLsit,
  favoriteClicked,
  favLimit,
  authed
}) {
  const disList = list.map((item, index) => (
    <ListItem
      key={item.id + index}
      itemSelected={() => itemSelected(index)}
      favoriteClicked={favoriteClicked}
      {...{ item, userfavLsit, authed, favLimit }}
    />
  ));
  return <div className={styles.container}>{disList}</div>;
}
