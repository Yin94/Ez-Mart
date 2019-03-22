import React from "react";
import styles from "./Pagination.css";
import Button from "../../../UI/Button/Button";
import MainSpan from "./MainSpan";
//should be 6*3
export const PAGE_CAP = 5;

export default function Pagination({ totalCount, pageSelected, currentPage }) {
  const totalPage = Math.ceil(totalCount / PAGE_CAP);
  const displayArea = [
    <Button onClick={() => pageSelected(1)} key='1'>
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
      <Button onClick={() => pageSelected(totalPage)} key={totalPage}>
        {totalPage}
      </Button>
    );
  } else if (totalPage === 2) {
    displayArea.push(
      <Button onClick={() => pageSelected(2)} key='2'>
        2
      </Button>
    );
  }

  return <div className={styles.pagiPanel}>{displayArea}</div>;
}
