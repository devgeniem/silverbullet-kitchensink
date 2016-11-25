import { createReducer } from 'reduxsauce';
import R from 'ramda';
import Types from '../actions/Types';

// state management funtions

export const INITIAL_STATE = {
  profile: {},
  token: null,
  isLoggedIn: false,
};

const loginUser = (state, action) =>
  Object.assign(R.clone(state), { profile: action.response.user, token: action.response.token, isLoggedIn: true });

const logoutUser = () => INITIAL_STATE;

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.LOGIN_USER]: loginUser,
  [Types.LOGOUT_USER]: logoutUser,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);

