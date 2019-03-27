import React, { useState } from "react";
import styles from "./ItemDecrip.css";
import Button from "../../../UI/Button/Button";
import SellerNote from "./SellerNote/SellerNote";
import { fetchItemPublisher } from "../../../db_api/db_items";
// import moduleName from 'module'
async function fetchContactData(id) {
  return await fetchItemPublisher(id);
}
export default function ItemDescrip({
  className,
  favBtnFlag,
  onSave,
  ...itemProps
}) {
  const { name, price, notes, publisher } = itemProps;
  const [showContact, contactClicked] = useState(false);
  const [pubInfo, getPubInfo] = useState(null);
  console.log(favBtnFlag);
  return (
    <div className={[className, styles["container"]].join(" ")}>
      <h3 style={{ fontSize: "40px" }}>{name}</h3>

      <div className={styles.price}>
        <small>Price:</small> <strong>${price}</strong>
      </div>

      <SellerNote {...{ notes }} />
      <div className={styles.btnGroup}>
        {favBtnFlag ? (
          <Button onClick={onSave}>Unsave</Button>
        ) : (
          <Button onClick={onSave}>Save</Button>
        )}
        <div className={styles.dropdown}>
          <Button
            onClick={async () => {
              if (!showContact && !pubInfo) {
                const publisherData = await fetchContactData(
                  publisher,
                  showContact
                );
                getPubInfo(publisherData);
              }
              contactClicked(!showContact);
            }}
            style={{ width: "100%" }}
            className='btn succeed'>
            Contact Seller
          </Button>
          {showContact && (
            <div className={styles.dropdownContent}>
              <small>Seller:</small>
              <p>{pubInfo["username"]}</p>

              <small>Email:</small>
              <input
                defaultValue={pubInfo["email"]}
                type='email'
                name='seller-email'
              />
              <small>Tel:</small>
              <p> {pubInfo["tel"]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
