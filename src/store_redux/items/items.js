import combine from "../../utility/combine";
import { fetchItems, queryItem } from "../../db_api/db_items";
//reducer
const initialState = {
  list: [],
  currentItem: null,
  error: false,
  loading: false,
  succeed: false
};
const setList = (state, list) => combine(state, { list, succeed: true });
const itemsError = (state, error) => combine(state, error);
const setCurItem = (state, currentItem) =>
  combine(state, { currentItem, succeed: true });
const resetStatus = state =>
  combine(state, {
    error: false,
    succeed: false,
    loading: false,
    currentItem: null
  });
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list);
    case ITEMS_ERROR:
      return itemsError(state, action.error);
    case SET_CURRENT_ITEM:
      return setCurItem(state, action.item);
    case COMMIT_STATUS:
      return resetStatus(state);
    default:
      return state;
  }
};
//actions
const SET_LIST = "items/SET_LIST";
const ITEMS_ERROR = "items/ITEMS_ERROR";
const SET_CURRENT_ITEM = "items/SET_CURRENT_ITEM";
const COMMIT_STATUS = "items/COMMIT_STATUS";
//action creators
export const startFetchingItems = () => {
  return async dispatch => {
    try {
      const list = await fetchItems();
      dispatch({ type: SET_LIST, list });
    } catch (error) {
      dispatch({ type: ITEMS_ERROR, error });
    }
  };
};

export const startFetchingItem = id => {
  return async dispatch => {
    const item = await queryItem(id);

    dispatch(setCurrentItem(item));
  };
};

export const setCurrentItem = item => {
  return { type: SET_CURRENT_ITEM, item };
};
export const commitItemsStatusAndItem = () => {
  return {
    type: COMMIT_STATUS
  };
};
