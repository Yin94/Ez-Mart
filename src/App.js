import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Layout>
          <Switch>
            <Route path='/auth' component={Auth} />
          </Switch>
        </Layout>
      </>
    );
  }
}

export default App;
