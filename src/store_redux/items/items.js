import combine from "../../utility/combine";
import { fetchItems } from "../../db_api/db_items";
//reducer
const initialState = {
  list: [],
  error: false,
  loading: false,
  succeed: false
};
const setList = (state, list) => combine(state, { list });
const itemsError = (state, error) => combine(state, error);
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list);
    case ITEMS_ERROR:
      return itemsError(state, action.error);
    default:
      return state;
  }
};
//actions
const SET_LIST = "items/SET_LIST";
const ITEMS_ERROR = "items/ITEMS_ERROR";
//action creators
export const startFetchingItems = () => {
  return async dispatch => {
    const list = await fetchItems();
    dispatch({ type: SET_LIST, list });
  };
};
