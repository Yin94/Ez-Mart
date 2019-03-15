import React from "react";
import styles from "./ListItem.css";
import Button from "../../../UI/Button/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListItem.propTypes = {
  price: PropTypes.number,
  ph: PropTypes.shape({
    name: PropTypes.string
  }),
  img: PropTypes.string
};
ListItem.defaultProps = {
  price: 9,
  ph: {
    name: "yin"
  }
};

export default function ListItem({ name, img, price, ph }) {
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
