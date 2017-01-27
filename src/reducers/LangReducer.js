import { createReducer } from 'reduxsauce';
import R from 'ramda';
import Types from '../actions/Types';

// state management funtions
export const INITIAL_STATE = {
  sync: true, // this state will be synced to server for serverside rendering
  lang: 'en',
};

const setLanguage = (state, action) =>
R.merge(state, { lang: action.lang });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CHANGE_LANGUAGE]: setLanguage,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
