import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import R from 'ramda';
import Types from '../actions/Types';
import uuid from 'node-uuid';

// helperfunctions
const handleListModification = (modifyId, newData, original) => {
  var index = R.find(id => id === modifyId, original);
  if (index === -1) return original;
  var clone = R.clone(original);
  clone[index] = newData;
  return clone;
};

const listMock = [{
  name: 'Mock lista nummer uno',
  id: uuid.v1(),
  modified: new Date(),
  items: [{
    id: uuid.v1(),
    name: 'Osta tyynyjä',
    date: new Date(),
  }],
}, {
  name: 'Mocklista 2',
  modified: new Date(),
  id: uuid.v1(),
  items: [{
    id: uuid.v1(),
    name: 'Osta matto',
    date: new Date(),
  }],
}];

// state management funtions

export const INITIAL_STATE = Immutable({
  lists: listMock,
});

const refreshLists = (state, action) =>
state.merge({
  lists: action.data,
});

const modifyList = (state, action) =>
state.merge({
  lists: handleListModification(action.id, action.data, state.list),
});

const removeList = (state, action) =>
state.merge({
  lists: R.filter(id => id === action.id, state.lists),
});

const createList = (state, action) =>
state.merge({
  lists: R.append(action.data, state.lists)
});


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.CREATE_LIST]: createList,
  [Types.REMOVE_LIST]: removeList,
  [Types.REFRESH_LIST]: refreshLists,
  [Types.MODIFY_LIST]: modifyList,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
