import combine from "../../utility/combine";
import * as dbAuth from "../../db_api/db_auth";

//reducer part
const initialState = {
  error: false,
  loading: false,
  succeed: false,
  authed: false
};
function setInfo(state, mode) {
  const newStatus = { loading: false, authed: true };
  if (mode !== "local") newStatus.succeed = true;
  return combine(state, newStatus);
}
function setError(state, error) {
  return combine(state, { error, loading: false });
}
function setProcessing(state) {
  return combine(state, { loading: true });
}
const resetStatus = state =>
  combine(state, { error: false, loading: false, succeed: false });
const logAuthOut = state => combine(state, { authed: false });
//reducer function
export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCEED:
      return setInfo(state, action.mode);
    case AUTH_ERROR:
      return setError(state, action.error);
    case AUTH_PROCESSING:
      return setProcessing(state);
    case COMMIT_STATUS:
      return resetStatus(state);
    case LOG_OUT:
      return logAuthOut(state);
    default:
      return state;
  }
}
//actions
const AUTH_SUCCEED = "auth/AUTH_SUCCEED";
const AUTH_PROCESSING = "auth/PROCESSING";
const AUTH_ERROR = "auth/AUTH_ERROR";
const COMMIT_STATUS = "auth/COMMIT_STATUS";
const LOG_OUT = "auth/LOG_OUT";
//action creators
export function tryAuth(email, password, mode) {
  return async dispatch => {
    dispatch({
      type: AUTH_PROCESSING
    });
    const result = await dbAuth.authWiwthEmailAndPswd(email, password, mode);
    if (result) dispatch({ type: AUTH_ERROR, error: result });
    else {
      localStorage.setItem("user-authed", true);
      dispatch(authSucceed());
    }
  };
}
export function authSucceed(mode) {
  return { type: AUTH_SUCCEED, mode };
}
export function commitStatus() {
  return {
    type: COMMIT_STATUS
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}
