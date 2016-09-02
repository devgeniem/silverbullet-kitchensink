import uuid from 'node-uuid';
import { removeItemByPropVal } from '../services/utils';

const initialState = {
  notifications: [],
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
  case 'NOTIFICATION_ADD':
    return Object.assign({}, { notifications: [...state.notifications, { id: uuid.v1(), style: action.style, message: action.message }] });
  case 'NOTIFICATION_REMOVE':
    return Object.assign({}, { notifications: removeItemByPropVal(state.notifications, 'id', action.id) });
  default:
    return state;
  }
}
