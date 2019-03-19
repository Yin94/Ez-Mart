import React from "react";
import styles from "./ItemDecrip.css";
import Button from "../../../UI/Button/Button";
import SellerNote from "./SellerNote/SellerNote";
export default function ItemDescrip({ className, onSave, ...itemProps }) {
  const { name, price, notes } = itemProps;
  return (
    <div className={[className, styles["container"]].join(" ")}>
      <h3 style={{ fontSize: "40px" }}>{name}</h3>

      <div className={styles.price}>
        <small>Price:</small> <strong>${price}</strong>
      </div>

      <SellerNote {...{ notes }} />
      <div className={styles.btnGroup}>
        <Button onClick={onSave}>Save</Button>
        <div className={styles.dropdown}>
          <Button style={{ width: "100%" }} className='btn succeed'>
            Contact Seller
          </Button>
          <div className={styles.dropdownContent}>
            <small>Seller:</small>
            <p>Yin94</p>

            <small>Email:</small>
            <input defaultValue={"adsas"} type='email' name='seller-email' />
            <small>Tel:</small>
            <p> 6072326499</p>
          </div>
        </div>
      </div>
    </div>
  );
}
