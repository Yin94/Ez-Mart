import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import Favorites from "./containers/Favorites/Favorites";
import ItemDetail from "./containers/ItemDetail/ItemDetail";
import Items from "./containers/Items/Items";
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
            <Route path='/item/:id' component={ItemDetail} />
            <Route path='/fav' component={Favorites} />
            <Route path='/items' component={Items} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
