import React from "react";
import styles from "./ListItem.css";
import Button from "../../../UI/Button/Button";
import { Link } from "react-router-dom";

export default function ListItem({
  itemSelected,
  userfavLsit,
  item,
  favoriteClicked
}) {
  const { name, imgs, price, id, favs } = item;
  const flag = userfavLsit.findIndex(yo => yo.id === id);
  console.log(flag);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img onClick={itemSelected} src={imgs[0]} alt='imgUrl' />

        {flag !== -1 ? (
          <Button onClick={() => favoriteClicked(id, true)} name='left'>
            Save
          </Button>
        ) : (
          <Button onClick={() => favoriteClicked(id, false)} name='left'>
            UnSave
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
