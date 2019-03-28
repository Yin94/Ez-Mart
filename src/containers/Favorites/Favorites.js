import React, { Component } from "react";
import FavHead from "./FavHead/FavHead";
import FavList from "./FavList/FavList";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/LoaderSpinDots/LoaderSpinDots";
import {
  startFetchingFavs,
  startManageFavItem
} from "../../store_redux/user/favorites";
import { setCurrentItem } from "../../store_redux/items/items";

const mps = state => ({
  list: state.favorites.list,
  idList: state.favorites.idList,
  error: state.favorites.error,
  succeed: state.favorites.succeed,
  isStart: state.favorites.isStart,
  loading: state.favorites.loading
});
const mpd = dispatch => ({
  fetchSavList: (idList, isStart) =>
    dispatch(startFetchingFavs(idList, isStart)),
  deleteFavItem: id => dispatch(startManageFavItem(id, false)),
  setPassedItem: item => dispatch(setCurrentItem(item))
});
export default connect(
  mps,
  mpd
)(
  class Favorites extends Component {
    state = {
      filter: ""
    };
    onDeleteHandler = id => {
      this.props.deleteFavItem(id);
    };
    onSearchHandler = (e, value) => {
      if (e.keyCode === 13 || e.target.name === "searchBtn") {
        this.setState({ filter: value });
      }
    };
    onResetSearchHandler = e => {
      this.setState({ filter: "" });
    };
    onClickItemHandler = item => {
      this.props.setPassedItem(item);
      this.props.history.push("/item/" + item.id);
    };
    componentDidMount = () => {
      this.props.fetchSavList(this.props.idList, this.props.isStart);
    };

    render() {
      if (!this.props.succeed) {
        if (this.props.error) alert("error on feching");
        return null;
      }
      const list = this.props.list.filter(item =>
        item.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
      );
      console.log(this.props.loading);
      //get items via ids,  1 part from loadedItemList, one part from server
      return (
        <div>
          <FavHead
            selected={this.onSearchHandler}
            resetSearch={this.onResetSearchHandler}
          />
          {this.props.loading ? (
            <Spinner />
          ) : (
            <FavList
              itemClicked={this.onClickItemHandler}
              list={list}
              deleteItem={this.onDeleteHandler}
            />
          )}
        </div>
      );
    }
  }
);
