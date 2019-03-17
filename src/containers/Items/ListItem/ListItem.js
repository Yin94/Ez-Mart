import React from "react";
import styles from "./ListItem.css";
import Button from "../../../UI/Button/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListItem.propTypes = {
  price: PropTypes.number,
  img: PropTypes.string,
  name: PropTypes.string
};
ListItem.defaultProps = {
  price: 9,
  img: "img",
  name: "yin"
};

export default function ListItem({ itemSelected, item }) {
  const { name, img, price, id, favs } = item;
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img onClick={itemSelected} src={img} alt='imgUrl' />

        <Button name='left'>Favorite</Button>
        <Button onClick={itemSelected} className='btn succeed' name='right'>
          Details
        </Button>
      </div>
      <div className={styles.descrip}>
        <strong>${price}</strong>
        <small>{favs} people saved it</small>
      </div>

      <p>
        <Link to={"/item/" + id}>{name}</Link>
      </p>
    </div>
  );
}
