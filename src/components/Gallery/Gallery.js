import React from 'react';
import styles from './Gallery.css';
import Spinner from '../../UI/Spinner/Spinner';
export default function Gallery({
  imgList,
  className,
  onClick,
  editMode = false
}) {
  let list;
  if (!editMode) {
    list = imgList.map((img, i) => (
      <button type='button' key={i} onClick={() => onClick(i)}>
        {imgList[i].slice(0, 4) === 'http' ? (
          <img className={styles.content} src={imgList[i]} alt='img' />
        ) : (
          <Spinner />
        )}
      </button>
    ));
  } else {
    list = imgList.map((img, i) => (
      <button type='button' key={i} onClick={() => onClick(i)}>
        <img className={styles.content} src={imgList[i]} alt='img' />
      </button>
    ));
  }
  return <div className={[styles.container, className].join(' ')}>{list}</div>;
}
