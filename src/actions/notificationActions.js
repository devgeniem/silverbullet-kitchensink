export function addNotification(style, message) {
  return (dispatch) =>
    dispatch({
      type: 'NOTIFICATION_ADD',
      style,
      message,
    });
}

export function removeNotification(id) {
  return (dispatch) =>
    dispatch({
      type: 'NOTIFICATION_REMOVE',
      id,
    });
}
