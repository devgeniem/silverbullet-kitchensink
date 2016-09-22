import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Types from '../actions/Types';

// state management funtions

export const INITIAL_STATE = Immutable({
  user: [],
  isLoggedIn: false
});

const loginUser = (state, action) =>
state.merge({
  user: action.data,
  isLoggedIn: true
});

const logoutUser = (state, action) =>
state.merge({
  user: [],
  isLoggedIn: false
})

const registerUser = (state, action) =>
state.merge({
  user: []
})

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.LOGIN_USER]: loginUser,
  [Types.REGISTER_USER]: registerUser,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);

