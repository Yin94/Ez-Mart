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
import { startFetchingItems } from "./store_redux/items/items";
class App extends Component {
  componentDidMount = () => {
    this.props.startFetchItems();
    const loggedIn = localStorage.getItem("user-authed");
    if (loggedIn) this.props.authSucceed("local");
  };
  logOutHandler = () => {
    // console.log("s");
    this.props.logOut();
  };
  itemSelectedHandler = index => {
    const itemId = this.props.items[index].id;
    this.props.history.push("item/" + itemId);
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
                  itemSelected={index => this.itemSelectedHandler(index)}
                />
              )}
            />
            <Redirect to='items' />
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
  authSucceed: mode => dispatch(authSucceed(mode)),
  logOut: () => dispatch(logOut()),
  startFetchItems: () => dispatch(startFetchingItems())
});
export default withRouter(
  connect(
    mps,
    mpd
  )(App)
);
