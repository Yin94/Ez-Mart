import combine from "../../utility/combine";
import * as dbAuth from "../../db_api/db_auth";

//reducer part
const initialState = {
  error: false,
  loading: false,
  succeed: false,
  authed: false,
  uid: ""
};
function setInfo(state, uid, fromLocal) {
  const newStatus = { loading: false, authed: true, uid: uid };
  if (!fromLocal) newStatus.succeed = true;
  console.log(newStatus.succeed);

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
const logAuthOut = state => combine(state, { authed: false, uid: "" });
//reducer function
export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCEED:
      return setInfo(state, action.uid, action.fromLocal);
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
export function tryAuth(form, mode) {
  return async dispatch => {
    dispatch({
      type: AUTH_PROCESSING
    });
    const result = await dbAuth.authWiwthEmailAndPswd(form, mode);
    if (result) dispatch({ type: AUTH_ERROR, error: result });
    else {
      const user = dbAuth.getCurrentUser();
      localStorage.setItem("user-authed", true);
      localStorage.setItem("user-uid", user.uid);
      dispatch(authSucceed(user.uid));
    }
  };
}
export function authSucceed(uid, fromLocal) {
  return { type: AUTH_SUCCEED, uid, fromLocal };
}
export function commitStatus() {
  return {
    type: COMMIT_STATUS
  };
}

export function logOut() {
  localStorage.removeItem("user-authed");
  localStorage.removeItem("user-uid");

  return {
    type: LOG_OUT
  };
}
