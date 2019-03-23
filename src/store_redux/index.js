import { combineReducers } from "redux";
import auth from "./auth/auth";
import items from "./items/items";
import favorites from "./user/favorites";
import posts from "./posts/posts";
export default combineReducers({ auth, items, favorites, posts });
