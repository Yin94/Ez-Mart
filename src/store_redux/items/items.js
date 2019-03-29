import combine from '../../utility/combine';
import { queryItem, downloadFiles } from '../../db_api/db_items';
import algoliasearch from 'algoliasearch/lite';
import PAGE_CAP from '../../utility/page_cap';
var client = algoliasearch('RV8PWAHFSY', '064d6e4b07f954168530110ec18bbf8d');

var searchIndex = client.initIndex('dev_ezMart_items');
//reducer
const initialState = {
  list: [],
  currentItem: null,
  error: false,
  loading: false,
  succeed: false,
  currentPage: 0
};
const setList = (state, list) => {
  return combine(state, { list, succeed: true, loading: false });
};
const itemsError = (state, error) => combine(state, error);
const setCurItem = (state, currentItem) => {
  return combine(state, { currentItem, succeed: true });
};

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
const setPage = (state, page) => combine(state, { currentItem: page });
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

    case FAV_COUNT_CHANGED:
      return favItemChanged(state, action.id, action.mode);
    case SET_LOADING:
      return setLoadingHandler(state);
    case SET_CURRENT_PAGE:
      return setPage(state, action.page);
    default:
      return state;
  }
};
//actions
const SET_LIST = 'items/SET_LIST';
const ITEMS_ERROR = 'items/ITEMS_ERROR';
const SET_CURRENT_ITEM = 'items/SET_CURRENT_ITEM';
const COMMIT_STATUS = 'items/COMMIT_STATUS';
const SET_CURRENT_PAGE = 'items/SET_CURRENT_PAGE';
const SET_LOADING = 'items/SET_LOADING';
export const FAV_COUNT_CHANGED = 'FAV_COUNT_CHANGED';
//action creators

export const startFetchingItems = (page, filter) => {
  return async dispatch => {
    dispatch({ type: SET_LOADING });
    searchIndex.search(
      { query: filter, page, hitsPerPage: PAGE_CAP },
      async function searchDone(error, content) {
        if (error) dispatch({ type: ITEMS_ERROR, error });
        else {
          const hits = [...content.hits];

          for (let item of hits) {
            const images = await downloadFiles(
              item.imgs,
              item.objectID,
              'cover-img'
            );
            item.imgs[0] = images[0];
          }
          dispatch({ type: SET_LIST, list: hits });
        }
      }
    );
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
