import ItemList from "./ItemList/ItemList";
import React, { Component } from "react";
import { startManageFavItem } from "../../store_redux/user/favorites";
import { withRouter } from "react-router-dom";
import Pagination from "./Pagination/Pagination";

import {
  setCurrentItem,
  startFetchingItems
} from "../../store_redux/items/items";

import { connect } from "react-redux";
const mps = state => ({
  list: state.items.list,
  totalCount: state.items.count,
  favs: state.favorites.idList,
  authed: state.auth.authed,
  error: state.favorites.error
});
const mpd = dispatch => ({
  startFetchItems: cursor => dispatch(startFetchingItems(cursor)),
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
        currentPage: 1
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
      onPageSelectHandler = index => {
        this.setState({ currentPage: index });
      };
      componentDidMount = () => {
        //TODO: add pagination logic here
        const currentPage = this.state.currentPage;
        this.props.startFetchItems(currentPage);
      };

      render() {
        // const totalCount = 6 * 5;
        const totalCount = this.props.totalCount;
        const currentPage = this.state.currentPage;

        return (
          <div>
            <ItemList
              authed={this.props.authed}
              list={this.props.list}
              userfavLsit={this.props.favs}
              itemSelected={this.itemSelectedHandler}
              favoriteClicked={this.onSavHandler}
            />
            <Pagination
              pageSelected={this.onPageSelectHandler}
              {...{ totalCount, currentPage }}
            />
          </div>
        );
      }
    }
  )
);
