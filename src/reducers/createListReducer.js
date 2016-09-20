import uuid from 'node-uuid';
import {removeItemByPropVal} from '../services/utils';

const initialState = {
  inputs: [{
    id: uuid.v1(),
    name: ''
  }],
};

export default function createListReducer(state = initialState, action) {
  switch (action.type) {
    case 'ITEM_SAVE':
      return Object.assign({}, {inputs: [...state.inputs, {id: uuid.v1(), name: action.name}]});
    case 'ITEM_REMOVE':
      return Object.assign({}, {inputs: removeItemByPropVal(state.inputs, 'id', action.id)});
    default:
      return state;
  }
}
