import React from "react";
import Button from "../../../UI/Button/Button";
import { PAGE_CAP } from "./Pagination";

export default function MainSpan({
  totalCount,
  currentPage,
  pageSelected,
  totalPage
}) {
  const notingSpan = <span>...</span>;
  let mainSpan = null;
  if (totalCount <= 6 * PAGE_CAP) {
    let displayArray = Array(totalPage - 2).fill(false);
    displayArray = displayArray.map((ele, index) => (
      <Button onClick={() => pageSelected(index + 2)} key={index}>
        {index + 2}
      </Button>
    ));
    mainSpan = <>{displayArray}</>;
  } else {
    if (currentPage >= 1 && currentPage <= 4)
      mainSpan = (
        <>
          <Button id='2' onClick={() => pageSelected(2)}>
            2
          </Button>
          <Button id='3' onClick={() => pageSelected(3)}>
            3
          </Button>
          <Button id='4' onClick={() => pageSelected(4)}>
            4
          </Button>
          <Button id='5' onClick={() => pageSelected(5)}>
            5
          </Button>
          {notingSpan}
        </>
      );
    else if (currentPage >= totalPage - 2 && currentPage <= totalPage)
      mainSpan = (
        <>
          {notingSpan}
          <Button
            id={totalPage - 3}
            onClick={() => pageSelected(totalPage - 3)}>
            {totalPage - 3}
          </Button>
          <Button
            id={totalPage - 2}
            onClick={() => pageSelected(totalPage - 2)}>
            {totalPage - 2}
          </Button>
          <Button
            id={totalPage - 1}
            onClick={() => pageSelected(totalPage - 1)}>
            {totalPage - 1}
          </Button>
        </>
      );
    else
      mainSpan = (
        <>
          {notingSpan}
          <Button
            id={currentPage - 1}
            onClick={() => pageSelected(currentPage - 1)}>
            {currentPage - 1}
          </Button>
          <Button id={currentPage} onClick={() => pageSelected(currentPage)}>
            {currentPage}
          </Button>
          <Button
            id={currentPage + 1}
            onClick={() => pageSelected(currentPage + 1)}>
            {currentPage + 1}
          </Button>
          {notingSpan}
        </>
      );
  }
  return <>{mainSpan}</>;
}
