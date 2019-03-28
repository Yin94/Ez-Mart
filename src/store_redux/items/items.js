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
  lastVisibleDoc: null,
  firstDoc: null,
  edge: null,
  lastDoc: null,
  count: 0
};
const setList = (state, mode, list, firstDoc, lastDoc) => {
  const edge = mode ? "next" : "last";
  if (!firstDoc && !lastDoc)
    return combine(state, { succeed: true, edge, loading: false });

  return combine(state, {
    list,
    firstDoc,
    lastDoc,
    edge: null,
    succeed: true,
    loading: false
  });
};
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
const favItemChanged = (state, id, mode) => {
  const list = [...state.list];
  const item = list.find(item => item.id === id);
  const diff = mode == true ? 1 : -1;
  item.favs = item.favs + diff;
  const result = combine(state, { list });

  return result;
};
const setLoadingHandler = state => combine(state, { loading: true });
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return setList(
        state,
        action.mode,
        action.list,
        action.firstDoc,
        action.lastDoc
      );
    case ITEMS_ERROR:
      return itemsError(state, action.error);
    case SET_CURRENT_ITEM:
      return setCurItem(state, action.item);
    case COMMIT_STATUS:
      return resetStatus(state);
    case SET_ITEMS_COUNT:
      return setItemsCount(state, action.count);
    case FAV_COUNT_CHANGED:
      return favItemChanged(state, action.id, action.mode);
    case SET_LOADING:
      return setLoadingHandler(state);
    default:
      return state;
  }
};
//actions
const SET_LIST = "items/SET_LIST";
const ITEMS_ERROR = "items/ITEMS_ERROR";
const SET_CURRENT_ITEM = "items/SET_CURRENT_ITEM";
const COMMIT_STATUS = "items/COMMIT_STATUS";
const SET_ITEMS_COUNT = "items/SET_ITEMS_COUNT";
const SET_LOADING = "items/SET_LOADING";
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
export const startFetchingItems = (cursor, mode) => {
  return async dispatch => {
    try {
      dispatch({ type: SET_LOADING });
      const result = await fetchItems(cursor, mode);
      const { list, firstDoc, lastDoc } = result;

      dispatch({ type: SET_LIST, mode, list, firstDoc, lastDoc });
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
