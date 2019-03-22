import { fetchSavList, manageFavItem } from "../../db_api/db_user";
import { getCurrentUser } from "../../db_api/db_auth";
import combine from "../../utility/combine";
import { FAV_COUNT_CHANGED } from "../items/items";
//reducer
const initialState = {
  list: [],
  error: false,
  loading: false,
  succeed: false
};
const setList = (state, list) => combine(state, { list, succeed: true });
const favsError = (state, error) => combine(state, { error });
const resetStatus = state =>
  combine(state, { error: false, succeed: false, loading: false });
const deleteItem = (state, id) => {
  const list = state.list.filter(item => item.id !== id);
  return combine(state, { list });
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list);
    case FAVS_ERROR:
      return favsError(state, action.error);
    case DELETE_ITEM:
      return deleteItem(state, action.id);
    case COMMIT_STATUS:
      return resetStatus(state);
    default:
      return state;
  }
};

const SET_LIST = "favorites/SET_LIST";
const FAVS_ERROR = "favorites/Favs_ERROR";
const COMMIT_STATUS = "favorites/COMMIT_STATUS";
const DELETE_ITEM = "favorites/DELETE_ITEM";
//action creators
export const startFetchingFavs = () => {
  const uid = localStorage.getItem("user-uid") || getCurrentUser().id;
  return async dispatch => {
    const list = await fetchSavList(uid);

    list instanceof Error
      ? dispatch({ type: FAVS_ERROR, error: list })
      : dispatch({ type: SET_LIST, list });
  };
};

export const startDeleteFavItem = id => {
  return async dispatch => {
    try {
      await manageFavItem(id, false);
      dispatch({ type: DELETE_ITEM, id });
      dispatch({ type: FAV_COUNT_CHANGED, id, diff: -1 });
    } catch (error) {
      dispatch({ type: FAVS_ERROR, error: error.message });
    }
  };
};
