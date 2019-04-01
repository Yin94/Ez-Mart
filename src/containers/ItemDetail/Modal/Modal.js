import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.css';
import ClosingTag from '../../../UI/ClosingTag/ClosingTag';
import NavArrow from '../../../UI/NavArrow/NavArrow';
function Modal({
  imgs,
  index,
  show,
  listLength,
  close,
  onSwitchImg,

  displayMode
}) {
  let displayNav = [
    <NavArrow
      id='left'
      key={'left'}
      onClick={onSwitchImg}
      orientation={'left'}
    />,
    <NavArrow
      id='right'
      key={'right'}
      onClick={onSwitchImg}
      orientation={'right'}
    />
  ];
  if (index === listLength - 1) displayNav.pop();
  if (index === 0) displayNav.splice(0, 1);
  return show ? (
    <div className={styles.container}>
      <ClosingTag onClick={close} />

      {displayNav}
      <img src={imgs[index]} alt='img' />
    </div>
  ) : null;
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  listLength: PropTypes.number.isRequired
};
Modal.defaultProps = {
  index: 0,
  listLength: 5,

  img:
    'https://external-preview.redd.it/DawO9IaFnqzr214G_g3hnQTrk01Gk4MY1z8qXSk6I_M.jpg?auto=webp&s=787392ee1ec8231441cfdb02c9b5b6a3c612846b'
};
export default Modal;
