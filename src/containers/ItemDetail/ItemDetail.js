import React, { Component } from "react";
import styles from "./Item.css";
import Gallery from "../../components/Gallery/Gallery";
import ItemDescrip from "./ItemDescrip/ItemDescrip";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "./Modal/Modal";
import {
  startFetchingItem,
  commitItemsStatusAndItem
} from "../../store_redux/items/items";
const mps = state => ({
  item: state.items.currentItem,
  succeed: state.items.succeed
});
const mpd = dispatch => ({
  fetchItem: id => dispatch(startFetchingItem(id)),
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
      onCloseModalHandler = e => {
        if (e.keyCode === 27 || e.type === "click")
          this.setState({ showModal: false });
      };
      onGalleryClickedHandler = imgIndex => {
        // const imgIndex= this.
        this.setState({ imgIndex });
      };
      componentDidMount = () => {
        window.addEventListener("keyup", this.onCloseModalHandler, false);
        const id = this.props.match.params.id;
        const item = this.props.item;
        if (!item) this.props.fetchItem(id);
      };
      componentWillUnmount = () => {
        this.props.commitStatus();
        window.removeEventListener("keyup", this.onCloseModalHandler, false);
      };

      render() {
        const item = this.props.item;
        //check if item exists in store
        if (!item) return null;
        const { price, name, imgs, notes } = item;
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
                imgList={item.imgs}
                onClick={this.onGalleryClickedHandler}
                className={styles.gallery}
              />
              <ItemDescrip
                {...{ name, price, notes }}
                className={styles.details}
              />
            </div>
          </>
        );
      }
    }
  )
);
