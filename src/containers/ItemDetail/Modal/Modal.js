import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.css";
import ClosingTag from "../../../UI/ClosingTag/ClosingTag";
import NavArrow from "../../../UI/NavArrow/NavArrow";
function Modal({
  img,
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
      key={"left"}
      onClick={onSwitchImg}
      orientation={"left"}
    />,
    <NavArrow
      id='right'
      key={"right"}
      onClick={onSwitchImg}
      orientation={"right"}
    />
  ];
  if (index === listLength - 1) displayNav.pop();
  if (index === 0) displayNav.splice(0, 1);
  return show ? (
    <div className={styles.container}>
      <ClosingTag onClick={close} />

      {displayNav}
      <img src={img} alt='img' />
    </div>
  ) : null;
}

//
Modal.propTypes = {
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  listLength: PropTypes.number.isRequired
};
Modal.defaultProps = {
  index: 0,
  listLength: 5,

  img:
    // "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/pro/ipad-pro-12-11-select-201810_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1540576009788"
    // "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Long_March_2D_launching_VRSS-1.jpg/1200px-Long_March_2D_launching_VRSS-1.jpg"
    "https://external-preview.redd.it/DawO9IaFnqzr214G_g3hnQTrk01Gk4MY1z8qXSk6I_M.jpg?auto=webp&s=787392ee1ec8231441cfdb02c9b5b6a3c612846b"
  // "https://blog.bookbaby.com/wp-content/uploads/2016/03/How-Long-Will-It-Take.png"
};
export default Modal;
