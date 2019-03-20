import React, { useState } from "react";
import styles from "./FavItem.css";
import Button from "../../../../UI/Button/Button";

export default function FavListItem({ item, deleteFavItem, itemClicked }) {
  const { price, name, imgs } = item;
  const [mode, onDelete] = useState(false);

  const deleteCorner = mode ? (
    <Button id='delete' onClick={deleteFavItem}>
      Delete Item
    </Button>
  ) : (
    <img
      onClick={() => onDelete(!mode)}
      src='https://image.flaticon.com/icons/png/512/51/51032.png'
      alt='delete'
      id='delete'
    />
  );
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={imgs[0]} alt='imgUrl' onClick={() => itemClicked(item)} />
        {deleteCorner}
        <Button name='left' onClick={() => itemClicked(item)}>
          Details
        </Button>
        <Button className='btn succeed' name='right'>
          Contact seller
        </Button>
      </div>

      <p>{name}</p>
      <small>${price}</small>
    </div>
  );
}
