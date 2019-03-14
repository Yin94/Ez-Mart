import React, { Component } from "react";
import styles from "./Item.css";
import Gallery from "../../components/Gallery/Gallery";
import ItemDescrip from "./ItemDescrip/ItemDescrip";
export default class Item extends Component {
  render() {
    return (
      <div className={styles.mainArea}>
        <div className={styles.lgPic}>
          <img src={src} alt='' />
        </div>
        <Gallery className={styles.gallery} />
        <ItemDescrip className={styles.details}>3</ItemDescrip>
      </div>
    );
  }
}

const src =
  "https://img.alicdn.com/bao/uploaded/i2/210064878/TB2tcZZjiCYBuNkHFCcXXcHtVXa_!!210064878.jpg_640x480Q50s50.jpg_.webp";
