import combine from "../../utility/combine";
import {
  fetchItems,
  queryItem,
  fetchItemTotalCounts,
  downloadFiles
} from "../../db_api/db_items";
//reducer
const initialState = {
  list: [],
  currentItem: null,
  error: false,
  loading: false,
  succeed: false,
  count: 0
};
const setList = (state, list) => combine(state, { list, succeed: true });
const itemsError = (state, error) => combine(state, error);
const setCurItem = (state, currentItem) => {
  return combine(state, { currentItem, succeed: true });
};
const setItemsCount = (state, count) => combine(state, { count });
const resetStatus = state =>
  combine(state, {
    error: false,
    succeed: false,
    loading: false,
    currentItem: null
  });
const favItemChanged = (state, id, diff) => {
  const list = [...state.list];
  const item = list.find(item => item.id === id);
  item.favs = item.favs + diff;
  return combine(state, { list });
};
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
    case SET_ITEMS_COUNT:
      return setItemsCount(state, action.count);
    case FAV_COUNT_CHANGED:
      return favItemChanged(state, action.id, action.diff);
    default:
      return state;
  }
};
//actions
const SET_LIST = "items/SET_LIST";
const ITEMS_ERROR = "items/ITEMS_ERROR";
const SET_CURRENT_ITEM = "items/SET_CURRENT_ITEM";
const COMMIT_STATUS = "items/COMMIT_STATUS";
const SET_ITEMS_COUNT = "SET_ITEMS_COUNT";
export const FAV_COUNT_CHANGED = "FAV_COUNT_CHANGED";
//action creators
export const startFetchingItemsCount = () => {
  return async dispatch => {
    try {
      const count = await fetchItemTotalCounts();
      dispatch({ type: SET_ITEMS_COUNT, count });
    } catch (error) {
      dispatch({ type: ITEMS_ERROR, error });
    }
  };
};
export const startFetchingItems = cursor => {
  return async dispatch => {
    try {
      const list = await fetchItems(cursor);
      dispatch({ type: SET_LIST, list });
    } catch (error) {
      dispatch({ type: ITEMS_ERROR, error });
    }
  };
};

export const startFetchingItem = (id, itemRef) => {
  return async dispatch => {
    if (itemRef) {
      // cuz  call by ref, have to create a new item, otherwise line61 will change state in store.
      const item = { ...itemRef };
      if (!itemRef.downloadAllImgs) {
        const [coverImg, ...toBeDownload] = item.imgs;
        const downloadedImgs = await downloadFiles(toBeDownload, item.id);
        item.imgs = [coverImg, ...downloadedImgs];
      } else {
        const downloadedImgs = await downloadFiles([...item.imgs], item.id);
        item.imgs = [...downloadedImgs];
      }

      dispatch(setCurrentItem(item));
    } else {
      const item = await queryItem(id);

      dispatch(setCurrentItem(item));
    }
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
