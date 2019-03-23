import combine from "../../utility/combine";
import { fetchPosts, fetchPostIDs } from "../../db_api/db_user";
import { getCurrentUser, managePost } from "../../db_api/db_auth";

const initialState = {
  list: [],
  idList: [],
  error: false,
  loading: false,
  succeed: false,
  currentPost: null,
  isFirst: true
};
const setList = (state, idList, list) =>
  combine(state, { idList, list, succeed: true, isFirst: false });
const postsError = (state, error) => combine(state, { error });
const resetStatus = state =>
  combine(state, { error: false, succeed: false, loading: false });
const deletePost = (state, id) => {
  const list = state.list.filter(item => item.id !== id);
  return combine(state, { list });
};
const setCurPost = (state, currentPost) => {
  return combine(state, { currentPost });
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.idList, action.list);
    case POSTS_ERROR:
      return postsError(state, action.error);
    case DELETE_POST:
      return deletePost(state, action.id);
    case SET_CURRENT_POST:
      return setCurPost(state, action.post);

    case COMMIT_STATUS:
      return resetStatus(state);
    default:
      return state;
  }
};

const SET_LIST = "posts/SET_LIST";
const SET_CURRENT_POST = "posts/SET_CURRENT_POST";

const POSTS_ERROR = "posts/Favs_ERROR";
const COMMIT_STATUS = "posts/COMMIT_STATUS";
const DELETE_POST = "posts/DELETE_ITEM";
//action creators
export const startFetchingPosts = (isFirst, localIdList) => {
  return async dispatch => {
    let idList = [...localIdList];
    let list = [];
    if (isFirst) idList = await fetchPostIDs();

    if (idList.length) list = await fetchPosts(idList);

    list instanceof Error || idList instanceof Error
      ? dispatch({ type: POSTS_ERROR, error: list })
      : dispatch({ type: SET_LIST, idList, list });
  };
};
export function setCurrentPost(item) {
  // {name,}
  const { imgs, name, price, notes } = item;
  const post = {
    imgs,
    name,
    price,
    notes,
    validation: Array(4).fill(false),
    loading: false,
    succeed: false
  };
  return { type: SET_CURRENT_POST, post };
}
export function commitStatus() {
  return { type: COMMIT_STATUS };
}
// export const startDeleteFavItem = id => {
//   return async dispatch => {
//     try {
//       await managePost(id, false);
//       dispatch({ type: DELETE_ITEM, id });
//       dispatch({ type: FAV_COUNT_CHANGED, id, diff: -1 });
//     } catch (error) {
//       dispatch({ type: FAVS_ERROR, error: error.message });
//     }
//   };
// };
