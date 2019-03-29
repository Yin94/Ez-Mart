import ItemList from './ItemList/ItemList';
import React, { Component } from 'react';
import { startManageFavItem } from '../../store_redux/user/favorites';
import { withRouter } from 'react-router-dom';
import Loader from '../../UI/Spinner/Loader3Color/Loader3Color';
import Pagination from './Pagination/Pagination';
import styles from './Items.css';
import {
  setCurrentItem,
  startFetchingItems
} from '../../store_redux/items/items';

import { connect } from 'react-redux';
const mps = state => ({
  list: state.items.list,
  totalCount: state.items.count,
  favs: state.favorites.idList,
  curPage: state.items.currentPage,
  authed: state.auth.authed,
  error: state.favorites.error,
  loading: state.items.loading
});
const mpd = dispatch => ({
  startFetchItems: (page, filter) => dispatch(startFetchingItems(page, filter)),
  setCurrentItem: item => dispatch(setCurrentItem(item)),

  manageFavItem: (id, mode) => dispatch(startManageFavItem(id, mode))
});
export default withRouter(
  connect(
    mps,
    mpd
  )(
    class Items extends Component {
      state = {
        disabledLeftBtn: false,
        disabledRightBtn: false,
        curPage: 1
      };
      onPageHandler = page => {
        page = parseInt(page) - 1;
        this.setState({ curPage: page + 1 }, () =>
          this.props.startFetchItems(page, '')
        );
      };
      itemSelectedHandler = index => {
        const item = this.props.list[index];
        this.props.setCurrentItem(item);
        this.props.history.push('item/' + item.id);
      };
      onSavHandler = async (id, diff) => {
        this.props.manageFavItem(id, diff);
        // const error = this.props.error;
        // if (error) alert('error form Items' + error.message);
      };

      componentDidMount = () => {
        //TODO: add pagination logic here
        this.props.startFetchItems(0, '');
      };

      render() {
        // if(this.state.curPage)
        return this.props.loading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <ItemList
              authed={this.props.authed}
              list={this.props.list}
              userfavLsit={this.props.favs}
              itemSelected={this.itemSelectedHandler}
              favoriteClicked={this.onSavHandler}
            />

            <Pagination
              totalCount={11}
              pageSelected={this.onPageHandler}
              currentPage={this.state.curPage}
            />
          </div>
        );
      }
    }
  )
);
