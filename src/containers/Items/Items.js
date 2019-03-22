import ItemList from "./ItemList/ItemList";
import React, { Component } from "react";
import { manageFavItem } from "../../db_api/db_user";
import { withRouter } from "react-router-dom";
import Pagination from "./Pagination/Pagination";
import {
  setCurrentItem,
  startFetchingItems
} from "../../store_redux/items/items";

import { connect } from "react-redux";
const mps = state => ({
  list: state.items.list,
  totalCount: state.items.count
});
const mpd = dispatch => ({
  startFetchItems: cursor => dispatch(startFetchingItems(cursor)),
  setCurrentItem: item => dispatch(setCurrentItem(item))
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
      onSavHandler = async id => {
        const error = await manageFavItem(id, true);
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
        const totalCount = this.props.totalCount;
        // const totalCount = 6 * 5;

        const currentPage = this.state.currentPage;
        return (
          <div>
            <ItemList
              list={this.props.list}
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
