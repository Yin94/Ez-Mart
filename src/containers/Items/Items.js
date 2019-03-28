import ItemList from "./ItemList/ItemList";
import React, { Component } from "react";
import { startManageFavItem } from "../../store_redux/user/favorites";
import { withRouter } from "react-router-dom";
import Loader from "../../UI/Spinner/Loader3Color/Loader3Color";
import Button from "../../UI/Button/Button";
import styles from "./Items.css";
import {
  setCurrentItem,
  startFetchingItems
} from "../../store_redux/items/items";

import { connect } from "react-redux";
const mps = state => ({
  list: state.items.list,
  totalCount: state.items.count,
  favs: state.favorites.idList,
  firstDoc: state.items.firstDoc,
  lastDoc: state.items.lastDoc,
  authed: state.auth.authed,
  error: state.favorites.error,
  loading: state.items.loading
});
const mpd = dispatch => ({
  startFetchItems: (cursor, mode) => dispatch(startFetchingItems(cursor, mode)),
  setCurrentItem: item => dispatch(setCurrentItem(item)),

  manageFavItem: (id, mode) => dispatch(startManageFavItem(id, mode))
});
export default withRouter(
  connect(
    mps,
    mpd
  )(
    class Items extends Component {
      state = {
        disabledLeftBtn: false,
        disabledRightBtn: false,
        curPage: 0
      };
      onPageHandler = e => {
        const lastDoc = this.props.lastDoc;
        const firstDoc = this.props.firstDoc;
        const page = this.state.curPage;
        const mode = e.target.name === "next" ? true : false;
        if (mode) {
          this.setState({ curPage: page + 1 });
          this.props.startFetchItems(lastDoc, true);
        } else {
          this.setState({ curPage: page - 1 });
          this.props.startFetchItems(firstDoc, false);
        }
      };
      itemSelectedHandler = index => {
        const item = this.props.list[index];
        this.props.setCurrentItem(item);
        this.props.history.push("item/" + item.id);
      };
      onSavHandler = async (id, diff) => {
        this.props.manageFavItem(id, diff);
        const error = this.props.error;
        if (error) alert(error.message);
      };

      componentDidMount = () => {
        //TODO: add pagination logic here
        this.props.startFetchItems(null, true);
      };

      render() {
        let leftDisabled = false,
          rightDisabled = false;
        if (this.props.lastDoc === "end") rightDisabled = true;
        if (!this.state.curPage) leftDisabled = true;
        return this.props.loading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <ItemList
              authed={this.props.authed}
              list={this.props.list}
              userfavLsit={this.props.favs}
              itemSelected={this.itemSelectedHandler}
              favoriteClicked={this.onSavHandler}
            />
            <div className={styles.btnGroup}>
              <Button
                disabled={leftDisabled}
                name='last'
                onClick={this.onPageHandler}>
                last page
              </Button>
              <Button
                disabled={rightDisabled}
                name='next'
                onClick={this.onPageHandler}>
                next page
              </Button>
            </div>
          </div>
        );
      }
    }
  )
);
