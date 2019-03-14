import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const bannerStyle = {
    backgroundColor: "#FB3808",
    height: "87px",
    textAlign: "center"
  };
  const headerStyle = {
    color: "white",
    padding: "20px"
  };
  const iconStyle = {
    height: "87px",
    float: "left"
  };

  return (
    <div style={bannerStyle}>
      <Link to='/'>
        <img
          style={iconStyle}
          src='http://www.diybillboardlights.com/Content/images/Shopping%20Cart%20Icon%20empty.png'
          alt=''
        />
      </Link>
      <h1 style={headerStyle}>Ez Mart</h1>
    </div>
  );
}
