import ItemList from "./ItemList/ItemList";
import React, { Component } from "react";
import { manageFavItem } from "../../db_api/db_user";
import { withRouter } from "react-router-dom";
import Pagination from "./Pagination/Pagination";
import { FAV_COUNT_CHANGED } from "../../store_redux/items/items";
import {
  setCurrentItem,
  startFetchingItems
} from "../../store_redux/items/items";

import { connect } from "react-redux";
const mps = state => ({
  list: state.items.list,
  totalCount: state.items.count,
  favs: state.favorites.list,
  authed: state.auth.authed
});
const mpd = dispatch => ({
  startFetchItems: cursor => dispatch(startFetchingItems(cursor)),
  setCurrentItem: item => dispatch(setCurrentItem(item)),
  updateFavCount: (id, diff) => dispatch({ type: FAV_COUNT_CHANGED, id, diff })
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
      onSavHandler = async (id, mode) => {
        const error = await manageFavItem(id, mode);

        if (error) alert(error.message);
        else {
          this.props.updateFavCount(id, mode);
        }
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
