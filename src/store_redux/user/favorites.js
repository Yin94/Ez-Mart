import { fetchFavList } from "../../db_api/db_user";
import combine from "../../utility/combine";
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

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return setList(state, action.list);
    case FAVS_ERROR:
      return favsError(state, action.error);

    case COMMIT_STATUS:
      return resetStatus(state);
    default:
      return state;
  }
};

const SET_LIST = "favorites/SET_LIST";
const FAVS_ERROR = "favorites/Favs_ERROR";
const COMMIT_STATUS = "favorites/COMMIT_STATUS";
//action creators
export const startFetchingFavs = uid => {
  return async dispatch => {
    const list = await fetchFavList(uid);
    list.code
      ? dispatch({ type: FAVS_ERROR, error: list })
      : dispatch({ type: SET_LIST, list });
  };
};
