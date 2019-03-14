import React from "react";
import styles from "./ItemDecrip.css";
import Button from "../../../UI/Button/Button";
import SellerNote from "./SellerNote/SellerNote";
export default function ItemDescrip({ className, ...itemProps }) {
  const { name = "test", price = 999 } = itemProps;
  return (
    <div className={[className, styles["container"]].join(" ")}>
      <h3 style={{ fontSize: "40px" }}>{name}</h3>

      <div className={styles.price}>
        <small>Price:</small> <strong>${price}</strong>
      </div>

      <SellerNote />
      <div className={styles.btnGroup}>
        <Button>Contact Seller</Button>
        <Button className='btn succeed'>Favorite</Button>
      </div>
    </div>
  );
}
