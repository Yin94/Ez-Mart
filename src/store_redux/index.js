import { combineReducers } from "redux";
import auth from "./auth/auth";
import items from "./items/items";
export default combineReducers({ auth, items });
