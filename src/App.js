import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./containers/Favorites/Favorites";
import ItemDetail from "./containers/ItemDetail/ItemDetail";
import MyPosts from "./containers/Posts/Posts";
import Items from "./containers/Items/Items";
import { connect } from "react-redux";
import { authSucceed, logOut } from "./store_redux/auth/auth";
import MakePost from "./containers/MakePost/MakePost";
import { startFetchingItemsCount } from "./store_redux/items/items";
class App extends Component {
  componentDidMount = () => {
    this.props.startFetchItemsCount();
    const loggedIn = localStorage.getItem("user-authed");
    if (loggedIn) {
      const uid = localStorage.getItem("user-uid");
      this.props.authSucceed(uid, true);
    }
  };
  logOutHandler = () => {
    this.props.history.push("/");
    this.props.logOut();
  };

  render() {
    const authed = this.props.authed;
    return (
      <div style={{ width: "100%" }}>
        <Header />
        <NavBar {...{ authed }} logOut={this.logOutHandler} />
        <Layout>
          <Switch>
            <Route path='/auth:mode' component={Auth} />
            <Route path='/item/:id' component={ItemDetail} />
            <Route path='/fav' component={Favorites} />
            <Route path='/make-post/:mode' component={MakePost} />
            <Route path='/items' component={Items} />
            <Route path='/my-posts' component={MyPosts} />

            <Redirect to='/items' />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mps = state => ({
  authed: state.auth.authed
});

const mpd = dispatch => ({
  authSucceed: (uid, mode) => dispatch(authSucceed(uid, mode)),
  logOut: () => dispatch(logOut()),
  startFetchItemsCount: () => dispatch(startFetchingItemsCount())
});
export default withRouter(
  connect(
    mps,
    mpd
  )(App)
);
