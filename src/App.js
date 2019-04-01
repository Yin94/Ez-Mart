import React, { Component, Suspense } from 'react';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import Layout from './hoc/Layout/Layout';
import Header from './components/Header/Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { connect } from 'react-redux';
import { authSucceed, logOut } from './store_redux/auth/auth';
import { startFetchingItems } from './store_redux/items/items';
import { startFetchingFavsIdList } from './store_redux/user/favorites';

const ResetPswd = React.lazy(() => import('./components/ResetPswd/ResetPswd'));
const MyPosts = React.lazy(() => import('./containers/Posts/Posts'));
const Items = React.lazy(() => import('./containers/Items/Items'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Favorites = React.lazy(() => import('./containers/Favorites/Favorites'));
const MakePost = React.lazy(() => import('./containers/MakePost/MakePost'));
const ItemDetail = React.lazy(() =>
  import('./containers/ItemDetail/ItemDetail')
);
class App extends Component {
  componentDidMount = () => {
    const loggedIn = localStorage.getItem('user-authed');
    if (loggedIn) {
      const uid = localStorage.getItem('user-uid');
      this.props.authSucceed(uid, true);
      this.props.startFetchFavs(uid);
    }
  };
  logOutHandler = () => {
    this.props.history.push('/items');
    this.props.logOut();
  };
  onSearchHandler = (e, value) => {
    if (e.keyCode === 13 || e.target.name === 'searchBtn') {
      this.props.history.push('/items');

      this.props.fetchItems(value);
    }
  };
  render() {
    const authed = this.props.authed;
    const userName = authed ? localStorage.getItem('user-username') : null;
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <div style={{ width: '100%' }}>
            <Header />
            <NavBar
              {...{ authed, userName }}
              logOut={this.logOutHandler}
              searched={this.onSearchHandler}
            />
            <Layout>
              <Switch>
                <Route path='/auth:mode' component={Auth} />
                <Route path='/item/:id' component={ItemDetail} />
                <Route path='/fav' component={Favorites} />
                <Route path='/make-post/:mode' component={MakePost} />
                <Route path='/items' component={Items} />
                <Route path='/my-posts' component={MyPosts} />
                <Route path='/resetpswd' component={ResetPswd} />
                resetpswd
                <Redirect to='/items' />
              </Switch>
            </Layout>
          </div>
        </Suspense>
        <footer
          style={{
            margin: '100px 0',
            textAlign: 'center',
            borderTop: '1px solid  #F61E0C',
            borderRadius: '0'
          }}>
          <p style={{ padding: '10px' }}>
            All rights reserved:{' '}
            <strong style={{ color: '#F61E0C' }}>Yin's Happy Market Inc</strong>
          </p>
        </footer>
      </ErrorBoundary>
    );
  }
}
const mps = state => ({
  authed: state.auth.authed
});

const mpd = dispatch => ({
  authSucceed: (uid, mode) => dispatch(authSucceed(uid, mode)),
  logOut: () => dispatch(logOut()),

  startFetchFavs: uid => dispatch(startFetchingFavsIdList(uid)),
  fetchItems: filter => dispatch(startFetchingItems(0, filter, true))
});
export default withRouter(
  connect(
    mps,
    mpd
  )(App)
);
