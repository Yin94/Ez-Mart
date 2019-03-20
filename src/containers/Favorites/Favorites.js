import React, { Component } from "react";
import FavHead from "./FavHead/FavHead";
import FavList from "./FavList/FavList";
import { connect } from "react-redux";
import {
  startFetchingFavs,
  startDeleteFavItem
} from "../../store_redux/user/favorites";
import { setCurrentItem } from "../../store_redux/items/items";

const mps = state => ({
  list: state.favorites.list,
  error: state.favorites.error,
  succeed: state.favorites.succeed
});
const mpd = dispatch => ({
  fetchSavList: () => dispatch(startFetchingFavs()),
  deleteFavItem: id => dispatch(startDeleteFavItem(id)),
  setPassedItem: item => dispatch(setCurrentItem(item))
});
export default connect(
  mps,
  mpd
)(
  class Favorites extends Component {
    onDeleteHandler = id => {
      this.props.deleteFavItem(id);
    };
    onClickItemHandler = item => {
      this.props.setPassedItem(item);
      this.props.history.push("/item/" + item.id);
    };
    componentDidMount = () => {
      this.props.fetchSavList();
    };

    render() {
      if (!this.props.succeed) {
        if (this.props.error) alert("error on feching");
        return null;
      }

      //get items via ids,  1 part from loadedItemList, one part from server
      return (
        <div>
          <FavHead />
          <FavList
            itemClicked={this.onClickItemHandler}
            list={this.props.list}
            deleteItem={this.onDeleteHandler}
          />
        </div>
      );
    }
  }
);
