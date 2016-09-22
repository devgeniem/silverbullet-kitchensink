import { createReducer } from 'reduxsauce';
import R from 'ramda';
import Types from '../actions/Types';

// state management funtions

export const INITIAL_STATE = { lists: [] };

const refreshLists = (state, action) =>
Object.assign(R.clone(state), { lists: action.data });

const removeList = (state, action) =>
Object.assign(R.clone(state), { lists: R.filter(id => id === action.id, state.lists) });

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.REMOVE_LIST]: removeList,
  [Types.REFRESH_LIST]: refreshLists,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
