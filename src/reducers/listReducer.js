import uuid from 'node-uuid';
import {removeItemByPropVal} from '../services/utils';

const initialState = {
  lists: [{
    id:'1',
    name: 'Lista 1'
  }, {
    id: '2',
    name: 'Lista 2'
  }],
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
