import React from "react";
import SearchBar from "../../UI/SearchBar/SearchBar";
import styles from "./NavItem/NavItem.css";
import { NavLink } from "react-router-dom";
import Button from "../../UI/Button/Button";
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
        <div className={styles.searchGroup}>
          <SearchBar type='navSearch' containerStyle={searchBarStyle} />
        </div>
        {authed ? (
          <>
            <div id={"2"} className={styles.dropdown}>
              <NavLink activeClassName={styles.active} to='/#'>
                Options
              </NavLink>
              <div className={styles.dropContent}>
                <NavLink activeClassName={styles.active} to='/make-post/0'>
                  I want to sell...
                </NavLink>
                <NavLink activeClassName={styles.active} to='/fav'>
                  Favorites
                </NavLink>
                <NavLink activeClassName={styles.active} to='/my-posts'>
                  My Posts
                </NavLink>
              </div>
            </div>

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
