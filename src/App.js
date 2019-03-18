import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./containers/Favorites/Favorites";
import ItemDetail from "./containers/ItemDetail/ItemDetail";
import Items from "./containers/Items/Items";
import { connect } from "react-redux";
import { authSucceed, logOut } from "./store_redux/auth/auth";
import { startFetchingItems, setCurrentItem } from "./store_redux/items/items";
class App extends Component {
  componentDidMount = () => {
    this.props.startFetchItems();
    const loggedIn = localStorage.getItem("user-authed");

    if (loggedIn) {
      const uid = localStorage.getItem("user-uid");
      this.props.authSucceed(uid, true);
    }
  };
  logOutHandler = () => {
    this.props.logOut();
  };
  itemSelectedHandler = index => {
    const item = this.props.items[index];
    this.props.setCurrentItem(item);
    this.props.history.push("item/" + item.id);
  };
  onFavHandler = id => {
    // console.log(id);
    alert("on fav handler");
  };
  render() {
    const authed = this.props.authed;
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Header />
        <NavBar {...{ authed }} logOut={this.logOutHandler} />
        <Layout>
          <Switch>
            <Route path='/auth:mode' component={Auth} />
            <Route path='/item/:id' component={ItemDetail} />
            <Route path='/fav' component={Favorites} />
            <Route
              path='/items'
              component={() => (
                <Items
                  list={this.props.items}
                  favoriteClicked={this.onFavHandler}
                  itemSelected={index => this.itemSelectedHandler(index)}
                />
              )}
            />
            <Redirect to='/items' />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mps = state => ({
  authed: state.auth.authed,
  items: state.items.list
});

const mpd = dispatch => ({
  authSucceed: (uid, mode) => dispatch(authSucceed(uid, mode)),
  logOut: () => dispatch(logOut()),
  startFetchItems: () => dispatch(startFetchingItems()),
  setCurrentItem: item => dispatch(setCurrentItem(item))
});
export default withRouter(
  connect(
    mps,
    mpd
  )(App)
);
