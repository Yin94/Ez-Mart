import React, { Component } from "react";
import FavHead from "./FavHead/FavHead";
import FavList from "./FavList/FavList";
import { connect } from "react-redux";
import { getCurrentUser } from "../../db_api/db_auth";
import { startFetchingFavs } from "../../store_redux/user/favorites";
const mps = state => ({
  list: state.favorites.list,
  error: state.favorites.error,
  succeed: state.favorites.succeed
});
const mpd = dispatch => ({
  fetchFavList: () =>
    dispatch(startFetchingFavs("4HnJojSIWTYUkK1uEiOj26FHJUn1"))
});
export default connect(
  mps,
  mpd
)(
  class Favorites extends Component {
    componentDidMount = () => {
      const uid = localStorage.getItem("user-uid") || getCurrentUser();
      this.props.fetchFavList(uid);
    };

    render() {
      const succeed = this.props.succeed;
      const error = this.props.error;
      if (error) {
        alert("error on feching");
        return null;
      }
      //get items via ids,  1 part from loadedItemList, one part from server
      return (
        succeed && (
          <div>
            <FavHead />
            <FavList />
          </div>
        )
      );
    }
  }
);
