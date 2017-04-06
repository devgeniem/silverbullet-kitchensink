import { createReducer } from 'reduxsauce';
import { Map } from 'immutable';
import { Types } from '../actions/LangActions';

// state management funtions
export const INITIAL_STATE = Map({
  sync: true, // this state will be synced to server for serverside rendering
  lang: 'en',
  error: null,
});

const setLanguage = (state, action) =>
  state
    .merge({
      lang: action.lang,
      error: action.error,
    });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CHANGE_LANGUAGE]: setLanguage,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
