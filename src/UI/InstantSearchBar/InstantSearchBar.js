import { connectSearchBox } from 'react-instantsearch-dom';
import React from 'react';
import styles from '../SearchBar/SearchBar.css';

import Button from '../Button/Button';
const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <div
    style={{ paddingTop: '10px', borderBottom: '1px solid #F71E0B' }}
    className={styles.searchGroup}>
    <input
      style={{ width: '70%', margin: '10px 0' }}
      type='search'
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
    <Button name='searchBtn' style={{ width: '30%' }}>
      Search
    </Button>
  </div>
);

export default connectSearchBox(SearchBox);
