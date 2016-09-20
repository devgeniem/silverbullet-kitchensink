export function addUser(name) {

  return (dispatch) =>
    dispatch({
      type: 'USER_ADD',
      name
    });
}

export function removeUser(id) {
  return (dispatch) =>
    dispatch({
      type: 'USER_REMOVE',
      id,
    });
}
