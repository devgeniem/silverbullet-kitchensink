import { createReducer } from 'reduxsauce';
import R from 'ramda';
import { Types } from '../actions/ListActions';

// state management funtions

export const INITIAL_STATE = {
  lists: [],
  error: null,
};

const refreshLists = (state, action) =>
R.merge(state, { lists: action.data, error: action.error });

const removeList = (state, action) =>
R.merge(state, { lists: R.filter(id => id === action.id, state.lists), error: action.error });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.REMOVE_LIST]: removeList,
  [Types.REFRESH_LIST]: refreshLists,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
