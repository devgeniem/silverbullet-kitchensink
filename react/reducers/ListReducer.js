import { createReducer } from 'reduxsauce';
import { Map, List } from 'immutable';
import { Types } from '../actions/ListActions';

// state management funtions
export const INITIAL_STATE = Map({
  lists: List(),
  error: null,
});

const refreshLists = (state, action) =>
  state.merge({
    lists: action.data,
    error: action.error,
  });

const removeList = (state, action) =>
  state
    .set('error', action.error)
    .update(
      'lists',
      state.get('lists').filterNot(list => list.id === action.id),
    );

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.REMOVE_LIST]: removeList,
  [Types.REFRESH_LIST]: refreshLists,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
