import React, { useState } from "react";
import styles from "./FavItem.css";
import Button from "../../../../UI/Button/Button";
import { Link } from "react-router-dom";

export default function FavListItem({ item, deleteFavItem }) {
  const { price, name, imgs, id } = item;
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
        <img src={imgs[0]} alt='imgUrl' />
        {deleteCorner}
        <Link to={"item/" + id}>
          <Button name='left'>Details</Button>
        </Link>
        <Button className='btn succeed' name='right'>
          Contact seller
        </Button>
      </div>

      <p>{name}</p>
      <small>${price}</small>
    </div>
  );
}
