import React, { Component } from "react";
import styles from "./Item.css";
import Gallery from "../../components/Gallery/Gallery";
import ItemDescrip from "./ItemDescrip/ItemDescrip";
import Modal from "./Modal/Modal";

export default class Item extends Component {
  state = {
    showModal: false,
    imgIndex: 0,
    imgLength: 5
  };
  onClickMainImgHandler = () => {
    this.setState({ showModal: true });
  };
  onSwitchModalPicHandler = e => {
    let imgIndex = this.state.imgIndex;
    imgIndex = e.target.id === "left" ? imgIndex - 1 : imgIndex + 1;

    this.setState({ imgIndex });
  };
  onCloseModalHandler = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <>
        <Modal
          onSwitchImg={this.onSwitchModalPicHandler}
          show={this.state.showModal}
          close={this.onCloseModalHandler}
          listLength={this.state.imgLength}
          index={this.state.imgIndex}
        />
        <div className={styles.mainArea}>
          <div className={styles.lgPic} onClick={this.onClickMainImgHandler}>
            <div className={styles.fadeIn}>
              <p>See image in modal</p>
            </div>

            <img src={src} alt='' />
          </div>
          <Gallery className={styles.gallery} />
          <ItemDescrip className={styles.details}>3</ItemDescrip>
        </div>
      </>
    );
  }
}

const src =
  "https://img.alicdn.com/bao/uploaded/i2/210064878/TB2tcZZjiCYBuNkHFCcXXcHtVXa_!!210064878.jpg_640x480Q50s50.jpg_.webp";
