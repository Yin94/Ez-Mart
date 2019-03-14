import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
class App extends Component {
  render() {
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Header />
        <Layout>
          <Switch>
            <Route path='/auth:mode' component={Auth} />
            <Redirect to='/auth0' />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
