export function addList(name) {
  return (dispatch) =>
    dispatch({
      type: 'LIST_ADD',
      name
    });
}

export function removeList(id) {
  return (dispatch) =>
    dispatch({
      type: 'LIST_REMOVE',
      id,
    });
}
