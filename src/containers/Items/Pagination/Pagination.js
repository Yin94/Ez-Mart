import React from 'react';
import styles from './Pagination.css';
import Button from '../../../UI/Button/Button';
import MainSpan from './MainSpan';

import PAGE_CAP from '../../../utility/page_cap';

export default function Pagination({ totalCount, pageSelected, currentPage }) {
  const totalPage = Math.ceil(totalCount / PAGE_CAP);
  const displayArea = [
    <Button
      curPage={currentPage}
      id='1'
      onClick={() => pageSelected(1)}
      key='1'>
      1
    </Button>
  ];
  if (totalPage > 2) {
    displayArea.push(
      <MainSpan
        key='main'
        {...{ totalCount, currentPage, pageSelected, totalPage }}
      />
    );
    displayArea.push(
      <Button
        curPage={currentPage}
        id={totalPage}
        onClick={() => pageSelected(totalPage)}
        key={totalPage}>
        {totalPage}
      </Button>
    );
  } else if (totalPage === 2) {
    displayArea.push(
      <Button
        curPage={currentPage}
        id='2'
        onClick={() => pageSelected(2)}
        key='2'>
        2
      </Button>
    );
  }

  return <div className={styles.pagiPanel}>{displayArea}</div>;
}
