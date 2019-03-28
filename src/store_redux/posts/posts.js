import combine from "../../utility/combine";
import { fetchPosts, fetchPostIDs } from "../../db_api/db_user";
import { deleteItem } from "../../db_api/db_items";

const initialState = {
  list: [],
  idList: [],
  error: false,
  loading: false,
  succeed: false,
  currentPost: null,
  isFirst: true
};
const userSwitched = state => combine(initialState);
const setList = (state, idList, list) => {
  return combine(state, {
    idList,
    list,
    succeed: true,
    isFirst: false,
    loading: false
  });
};
const setLoadingPost = state => combine(state, { loading: true });
const postsError = (state, error) => combine(state, { error });
const resetStatus = state =>
  combine(state, { error: false, succeed: false, loading: false });
const deletePost = (state, id) => {
  const list = state.list.filter(item => item.id !== id);
  const idList = state.idList.filter(item => item !== id);
  return combine(state, {
    list,
    idList,
    succeed: true,
    loading: false,
    error: false
  });
};
const setCurPost = (state, currentPost) => {
  return combine(state, { currentPost });
};
const addPostHandler = (state, id) => {
  const idList = [...state.idList];
  idList.push(id);
  return combine(state, { idList });
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
    case ADD_POST:
      return addPostHandler(state, action.id);
    case USER_SWITCHED:
      return userSwitched(state);
    case SET_LOADING:
      return setLoadingPost(state);
    default:
      return state;
  }
};

const SET_LIST = "posts/SET_LIST";
const SET_CURRENT_POST = "posts/SET_CURRENT_POST";
const ADD_POST = "posts/ADD_POST";
const POSTS_ERROR = "posts/POSTS_ERROR";
const COMMIT_STATUS = "posts/COMMIT_STATUS";
const DELETE_POST = "posts/DELETE_ITEM";
const SET_LOADING = "posts/SET_LOADING";
export const USER_SWITCHED = "posts/USER_SWITCHED";
//action creators
export const startFetchingPosts = (isFirst, localIdList) => {
  return async dispatch => {
    dispatch({ type: "posts/SET_LOADING" });
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

  const post = {
    ...item,
    displayImgs: []
  };
  return { type: SET_CURRENT_POST, post };
}
export function commitStatus() {
  return { type: COMMIT_STATUS };
}

export function startDeletingPost(id) {
  return async dispatch => {
    const error = await deleteItem(id);
    if (error) dispatch({ type: POSTS_ERROR, error });
    else dispatch({ type: DELETE_POST, id });
  };
}
export function addPost(id) {
  return {
    type: ADD_POST,
    id
  };
}
