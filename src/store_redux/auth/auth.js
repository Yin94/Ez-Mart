import combine from '../../utility/combine';
import * as dbAuth from '../../db_api/db_auth';
import { USER_SWITCHED } from '../posts/posts';
import { USER_SWITCHED_FAV, startFetchingFavsIdList } from '../user/favorites';
import { db } from '../../firebase/apps/apps';

const initialState = {
  error: false,
  loading: false,
  succeed: false,
  authed: false,
  uid: ''
};
function setInfo(state, uid, fromLocal) {
  const newStatus = { loading: false, authed: true, uid: uid };
  if (!fromLocal) newStatus.succeed = true;

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
const logAuthOut = state => combine(state, { authed: false, uid: '' });

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

const AUTH_SUCCEED = 'auth/AUTH_SUCCEED';
const AUTH_PROCESSING = 'auth/PROCESSING';
const AUTH_ERROR = 'auth/AUTH_ERROR';
const COMMIT_STATUS = 'auth/COMMIT_STATUS';
const LOG_OUT = 'auth/LOG_OUT';

export function tryAuth(form, mode) {
  return async dispatch => {
    dispatch({
      type: AUTH_PROCESSING
    });
    const result = await dbAuth.authWiwthEmailAndPswd(form, mode);
    if (result) dispatch({ type: AUTH_ERROR, error: result });
    else {
      const user = dbAuth.getCurrentUser();
      localStorage.setItem('user-authed', true);
      localStorage.setItem('user-uid', user.uid);
      let username = null;
      if (form.username) {
        username = form.username;
      } else {
        const userRef = await db
          .collection('users')
          .where('uid', '==', user.uid)
          .get();
        userRef.forEach(docRef => (username = docRef.data().username));
      }
      localStorage.setItem('user-username', username);
      dispatch(authSucceed(user.uid));

      dispatch(startFetchingFavsIdList(user.uid));
      dispatch({ type: USER_SWITCHED });
      dispatch({ type: USER_SWITCHED_FAV });
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
  localStorage.removeItem('user-authed');
  localStorage.removeItem('user-uid');
  localStorage.removeItem('user-username');
  return {
    type: LOG_OUT
  };
}
