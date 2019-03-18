import { combineReducers } from "redux";
import auth from "./auth/auth";
import items from "./items/items";
import favorites from "./user/favorites";
export default combineReducers({ auth, items, favorites });
