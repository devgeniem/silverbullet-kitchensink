import uuid from 'node-uuid';
import {removeItemByPropVal} from '../services/utils';

const initialState = {
  lists: [],
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case 'LIST_ADD':
      return Object.assign({}, {lists: [...state.lists, {id: uuid.v1(), name: action.name}]});
    case 'LIST_REMOVE':
      return Object.assign({}, {lists: removeItemByPropVal(state.lists, 'id', action.id)});
    default:
      return state;
  }
}
