import uuid from 'node-uuid';
import { removeItemByPropVal } from '../services/utils';

const initialState = {
  users: [],
};

export default function modalShareListReducer(state = initialState, action) {
  switch (action.type) {
  case 'USER_ADD':
    return Object.assign({}, { modalShareLists: [...state.modalShareLists, { id: uuid.v1(), style: action.style, message: action.message }] });
  case 'USER_REMOVE':
    return Object.assign({}, { modalShareLists: removeItemByPropVal(state.modalShareLists, 'id', action.id) });
  default:
    return state;
  }
}
