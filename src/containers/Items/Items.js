import ItemList from './ItemList/ItemList';
import React, { Component } from 'react';
import { startManageFavItem } from '../../store_redux/user/favorites';
import { withRouter } from 'react-router-dom';
import Loader from '../../UI/Spinner/LoaderSpinDots/LoaderSpinDots';
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
  isFirst: state.items.isFirst,
  authed: state.auth.authed,
  error: state.favorites.error,
  loading: state.items.loading,
  count: state.items.count,
  filter: state.items.filter
});
const mpd = dispatch => ({
  startFetchItems: (page, filter, isFirst) =>
    dispatch(startFetchingItems(page, filter, isFirst)),
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
          this.props.startFetchItems(page, this.props.filter)
        );
      };
      itemSelectedHandler = index => {
        const item = this.props.list[index];
        this.props.setCurrentItem(item);
        this.props.history.push('item/' + item.id);
      };
      onSavHandler = async (id, diff) => {
        this.props.manageFavItem(id, diff);
      };

      componentDidMount = () => {
        this.props.startFetchItems(0, '', true);
      };

      render() {
        return this.props.loading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <ItemList
              authed={this.props.authed}
              list={this.props.list}
              userfavLsit={this.props.favs}
              favLimit={this.props.favs.length < 18}
              itemSelected={this.itemSelectedHandler}
              favoriteClicked={this.onSavHandler}
            />

            <Pagination
              totalCount={this.props.count}
              pageSelected={this.onPageHandler}
              currentPage={this.state.curPage}
            />
          </div>
        );
      }
    }
  )
);
