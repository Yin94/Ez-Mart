import React, { Component } from "react";
import styles from "./Item.css";
import Gallery from "../../components/Gallery/Gallery";
import ItemDescrip from "./ItemDescrip/ItemDescrip";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { manageFavItem } from "../../db_api/db_user";
import Modal from "./Modal/Modal";
import {
  startFetchingItem,
  commitItemsStatusAndItem
} from "../../store_redux/items/items";
const mps = state => ({
  item: state.items.currentItem,
  items: state.items,
  succeed: state.items.succeed
});
const mpd = dispatch => ({
  fetchItem: (id, item) => dispatch(startFetchingItem(id, item)),
  commitStatus: () => dispatch(commitItemsStatusAndItem())
});

export default withRouter(
  connect(
    mps,
    mpd
  )(
    class Item extends Component {
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
      onGalleryClickedHandler = imgIndex => {
        this.setState({ imgIndex });
      };
      onSaveHandler = async id => {
        await manageFavItem(id, true);
      };
      onModalKeyPressHandler = e => {
        const key = e.keyCode;
        if (key === 27) this.onCloseModalHandler();
        if (key === 37 && this.state.imgIndex !== 0)
          this.onSwitchModalPicHandler({ target: { id: "left" } });
        if (key === 39 && this.state.imgIndex !== this.state.imgLength - 1)
          this.onSwitchModalPicHandler({ target: { id: "right" } });
      };
      componentDidMount = () => {
        window.addEventListener("keyup", this.onModalKeyPressHandler, false);
        const id = this.props.match.params.id;
        const item = this.props.item;
        this.props.fetchItem(id, item);
      };
      componentWillUnmount = () => {
        this.props.commitStatus();
        window.removeEventListener("keyup", this.onCloseModalHandler, false);
      };

      render() {
        const item = this.props.item;
        if (!item) return null;
        const { price, name, imgs, notes, id, publisher } = item;

        return (
          <>
            <Modal
              {...{ imgs }}
              onSwitchImg={this.onSwitchModalPicHandler}
              show={this.state.showModal}
              close={this.onCloseModalHandler}
              listLength={this.state.imgLength}
              index={this.state.imgIndex}
            />
            <div className={styles.mainArea}>
              <div
                className={styles.lgPic}
                onClick={this.onClickMainImgHandler}>
                <div className={styles.fadeIn}>
                  <p>See image in modal</p>
                </div>

                <img src={imgs[this.state.imgIndex]} alt='' />
              </div>
              <Gallery
                imgList={imgs}
                onClick={this.onGalleryClickedHandler}
                className={styles.gallery}
              />
              <ItemDescrip
                onSave={() => this.onSaveHandler(id)}
                {...{ name, price, notes, publisher }}
                className={styles.details}
              />
            </div>
          </>
        );
      }
    }
  )
);
