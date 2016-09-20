import uuid from 'node-uuid';
import {removeItemByPropVal} from '../services/utils';

const initialState = {
  items: [],
};

export default function todoListItemReducer(state = initialState, action) {
  switch (action.type) {
    case 'TODO_LIST_ITEM_ADD':
      return Object.assign({}, {items: [...state.items, {id: uuid.v1(), name: action.name}]});
    case 'TODO_LIST_ITEM_REMOVE':
      console.log(state.items);
      return Object.assign({}, {items: removeItemByPropVal(state.items, 'id', action.id)});
    default:
      return state;
  }
}
