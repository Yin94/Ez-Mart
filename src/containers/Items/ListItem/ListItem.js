import React from "react";
import styles from "./ListItem.css";
import Button from "../../../UI/Button/Button";
import { Link } from "react-router-dom";
export default function ListItem({ name, img, price }) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={img} alt='imgUrl' />

        <Button name='left'>Details</Button>
        <Button className='btn succeed' name='right'>
          Contact seller
        </Button>
      </div>

      <small>${price}</small>
      <p>
        <Link to='/item/zxcsd'>{name}</Link>
      </p>
    </div>
  );
}
