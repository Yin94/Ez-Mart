import React from "react";
import SearchBar from "../../UI/SearchBar/SearchBar";
import styles from "./NavItem/NavItem.css";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  const searchBarStyle = {
    paddingTop: "10px"
  };
  return (
    <nav>
      <div className={styles.NavBar}>
        <NavLink id={"1"} activeClassName={styles.active} exact to='/'>
          Home
        </NavLink>
        <SearchBar type='navSearch' containerStyle={searchBarStyle} />
        <NavLink id={"2"} activeClassName={styles.active} to='/auth0'>
          Authenticate
        </NavLink>
        <NavLink id={"3"} activeClassName={styles.active} to='/fav'>
          Fav
        </NavLink>
        <NavLink id={"4"} activeClassName={styles.active} to='/item/asdas'>
          item
        </NavLink>
      </div>
    </nav>
  );
}
