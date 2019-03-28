import { fetchSavIds, fetchSavList, manageFavItem } from "../../db_api/db_user";
import { getCurrentUser } from "../../db_api/db_auth";
import combine from "../../utility/combine";
import { FAV_COUNT_CHANGED } from "../items/items";
//reducer
const initialState = {
  list: [],
  idList: [],
  error: false,
  loading: false,
  succeed: false,
  isStart: true
};
const setList = (state, list) =>
  combine(state, { list, succeed: true, isStart: false, loading: false });
const favsError = (state, error) => combine(state, { error });
const resetStatus = state =>
  combine(state, { error: false, succeed: false, loading: false });
const manageItem = (state, id, mode) => {
  let idList = [...state.idList];
  let list = [...state.list];
  // const idList = mode ? newList.push(id) : newList.filter(item => item !== id);

  if (mode == true) {
    idList.push(id);
  } else {
    idList = idList.filter(item => item !== id);
    list = list.filter(item => item.id !== id);
  }
  return combine(state, { idList, list });
};
const setLoadingFavs = state => combine(state, { loading: true });
const userSwitched = state => combine(initialState);
const setFavIds = (state, idList) => combine(state, { idList, succeed: true });
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list);
    case FAVS_ERROR:
      return favsError(state, action.error);
    case MANAGE_ITEM:
      return manageItem(state, action.id, action.mode);
    case COMMIT_STATUS:
      return resetStatus(state);
    case SET_FAV_IDs:
      return setFavIds(state, action.list);
    case USER_SWITCHED_FAV:
      return userSwitched(state);
    case SET_LOADING:
      return setLoadingFavs(state);
    default:
      return state;
  }
};

const SET_LIST = "favorites/SET_LIST";
const FAVS_ERROR = "favorites/Favs_ERROR";
const COMMIT_STATUS = "favorites/COMMIT_STATUS";
const MANAGE_ITEM = "favorites/MANAGE_ITEM";
const SET_FAV_IDs = "favorites/SET_FAV_IDs";
const SET_LOADING = "favorites/SET_LOADING";
export const USER_SWITCHED_FAV = "favorites/USER_SWITCHED_FAV";
//action creators
export const startFetchingFavs = (idList, isStart) => {
  return async dispatch => {
    dispatch({ type: SET_LOADING });
    const uid = localStorage.getItem("user-uid") || getCurrentUser().id;
    const list = await fetchSavList(idList, uid, isStart);

    list instanceof Error
      ? dispatch({ type: FAVS_ERROR, error: list })
      : dispatch({ type: SET_LIST, list });
  };
};

export const startManageFavItem = (id, mode) => {
  return async dispatch => {
    try {
      await manageFavItem(id, mode);
      dispatch({ type: MANAGE_ITEM, id, mode });
      dispatch({ type: FAV_COUNT_CHANGED, id, mode });
    } catch (error) {
      dispatch({ type: FAVS_ERROR, error: error.message });
    }
  };
};

export const startFetchingFavsIdList = id => {
  return async dispatch => {
    const list = await fetchSavIds(id);
    console.log(list);
    dispatch({ type: SET_FAV_IDs, list });
  };
};
