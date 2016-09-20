export function addTodoListItem(name) {
  return (dispatch) =>
    dispatch({
      type: 'TODO_LIST_ITEM_ADD',
      name
    });
}

export function removeTodoListItem(id) {
  return (dispatch) =>
    dispatch({
      type: 'TODO_LIST_ITEM_REMOVE',
      id,
    });
}
