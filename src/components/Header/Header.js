import React from "react";

export default function Header() {
  const bannerStyle = {
    backgroundColor: "#FB3808",
    height: "87px",
    textAlign: "center"
  };
  const headerStyle = {
    color: "white"
  };
  return (
    <div style={bannerStyle}>
      <h1 style={headerStyle}>Ez Mart</h1>
    </div>
  );
}
