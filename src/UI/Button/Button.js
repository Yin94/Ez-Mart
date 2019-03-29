import React from 'react';
import styles from './Button.css';
export default function Button({
  className = 'btn primary',
  children,
  disabled,
  curPage,
  style,
  ...others
}) {
  className = className.split(' ').map(cName => styles[cName]);
  className = className.join(' ');
  if (curPage) disabled = curPage === parseInt(others.id) ? true : false;
  return (
    <button style={style} {...{ ...others, className }} disabled={disabled}>
      {children}{' '}
    </button>
  );
}
