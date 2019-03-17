import React from "react";
import SearchBar from "../../UI/SearchBar/SearchBar";
import styles from "./NavItem/NavItem.css";
import { NavLink } from "react-router-dom";
export default function NavBar({ authed, logOut }) {
  const searchBarStyle = {
    paddingTop: "10px"
  };
  return (
    <nav>
      <div className={styles.NavBar}>
        <NavLink id={"1"} activeClassName={styles.active} to='/items'>
          Items
        </NavLink>
        <SearchBar type='navSearch' containerStyle={searchBarStyle} />
        {authed ? (
          <>
            <NavLink id={"2"} activeClassName={styles.active} to='/fav'>
              Fav
            </NavLink>
            <NavLink
              id={"3"}
              onClick={logOut}
              activeClassName={styles.active}
              to='#'>
              Sign Out
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <NavLink id={"2"} activeClassName={styles.active} to='/auth0'>
              Sign Up
            </NavLink>
            <NavLink id={"3"} activeClassName={styles.active} to='/auth1'>
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
