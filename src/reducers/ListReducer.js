import { createReducer } from 'reduxsauce';
import R from 'ramda';
import Types from '../actions/Types';

// helperfunctions
const handleListModification = (modifyId, newData, original) => {
  var index = R.find(id => id === modifyId, original);
  if (index === -1) return original;
  var clone = R.clone(original);
  clone[index] = newData;
  return clone;
};

// state management funtions

export const INITIAL_STATE = { lists: [] };

const refreshLists = (state, action) =>
Object.assign(R.clone(state), { lists: action.data });

const modifyList = (state, action) =>
Object.assign(R.clone(state), { lists: handleListModification(action.id, action.data, state.list) });

const removeList = (state, action) =>
Object.assign(R.clone(state), { lists: R.filter(id => id === action.id, state.lists) });

const createList = (state, action) => {
  var newState = Object.assign({}, state);
  newState.lists = R.append(action.data, newState.lists);
  return newState;
};

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CREATE_LIST]: createList,
  [Types.REMOVE_LIST]: removeList,
  [Types.REFRESH_LIST]: refreshLists,
  [Types.MODIFY_LIST]: modifyList,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
