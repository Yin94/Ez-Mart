import React from "react";
import styles from "./NavArrow.css";
import PropTypes from "prop-types";

export default function NavArrow({ orientation, index, ...others }) {
  return <i className={styles[orientation]} {...others} />;
}

NavArrow.propTypes = {
  orientation: PropTypes.string.isRequired
};

NavArrow.defaultProps = {
  orientation: "left"
};
