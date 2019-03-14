import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./containers/Favorites/Favorites";
import Item from "./containers/Item/Item";
import "./grid_lib/grid.css";
class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Header />
        <NavBar />
        <Layout>
          <Switch>
            <Route path='/auth:mode' component={Auth} />
            <Route path='/item/:id' component={Item} />
            <Route path='/fav' component={Favorites} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
