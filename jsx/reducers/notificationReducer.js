import uuid from 'node-uuid';
import { removeItemByPropVal } from '../services/utils';

const initialState = {
  notifications: [],
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return Object.assign({}, { notifications: [...state.notifications, { id: uuid.v1(), style: action.style, message: action.message }] });
  case 'REMOVE_NOTIFICATION':
    return Object.assign({}, { notifications: removeItemByPropVal(state.notifications, 'id', action.id) });
  default:
    return state;
  }
}
