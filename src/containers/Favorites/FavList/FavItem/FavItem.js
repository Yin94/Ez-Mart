import React from "react";
import styles from "./FavItem.css";
import Button from "../../../../UI/Button/Button";
export default function FavListItem({ favItem = item }) {
  const { price, name, imgUrl } = favItem;
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={imgUrl} alt='imgUrl' />
        <img
          src='https://image.flaticon.com/icons/png/512/51/51032.png'
          alt='delete'
        />
        <Button name='left'>Details</Button>
        <Button className='btn succeed' name='right'>
          Contact seller
        </Button>
      </div>

      <p>{name}</p>
      <small>${price}</small>
    </div>
  );
}

const item = {
  name: "white shoes",
  price: 40,
  imgUrl:
    "https://img.alicdn.com/bao/uploaded/i4/57178339/O1CN013y7vRL2BTJI3uVSps_!!57178339.jpg_160x160xz.jpg"
};
