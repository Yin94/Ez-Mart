import React from "react";
import styles from "./ListItem.css";
import Button from "../../../UI/Button/Button";
import { Link } from "react-router-dom";

export default function ListItem({
  itemSelected,
  userfavLsit,
  item,
  favoriteClicked,
  authed
}) {
  const { name, imgs, price, id, favs } = item;

  let btnDisabled = false,
    title = "";
  let flag = null;
  if (!authed) {
    flag = -1;
    btnDisabled = true;
    title = "Pleas signin first!";
  } else {
    flag = userfavLsit.findIndex(yo => yo.id === id);
  }
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img onClick={itemSelected} src={imgs[0]} alt='imgUrl' />

        {flag >= 0 ? (
          <Button onClick={() => favoriteClicked(id, false)} name='left'>
            UnSave
          </Button>
        ) : (
          <Button
            disabled={btnDisabled}
            id={btnDisabled ? "disabled" : "active"}
            title={title}
            onClick={() => favoriteClicked(id, true)}
            name='left'>
            Save
          </Button>
        )}

        <Button onClick={itemSelected} className='btn succeed' name='right'>
          Details
        </Button>
      </div>
      <div className={styles.descrip}>
        <strong>${price}</strong>
        <small>{favs} people saved it</small>
      </div>

      <p>
        <Link to={"/item/" + id + "/" + true}>{name}</Link>
      </p>
    </div>
  );
}
