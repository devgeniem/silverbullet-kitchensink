import api from '../services/api';

export function addTodoListItem(name) {
  return (dispatch) =>
    api.post('/list-item', name)
      .then(savedItem =>
        dispatch({
          type: 'TODO_LIST_ITEM_ADD',
          name,
        })
      )
      .catch(error =>
        dispatch({
          type: 'ERROR',
          error,
        })
      );
}

export function removeTodoListItem(id) {
  return (dispatch) =>
    api.del('/list-item/'+id)
      .then(() =>
        dispatch({
          type: 'TODO_LIST_ITEM_REMOVE',
          id,
        })
      )
      .catch(error =>
        dispatch({
          type: 'ERROR',
          error,
        })
      );
}

/*
export function addTodoListItem(name) {
  return (dispatch) =>
    dispatch({
      type: 'TODO_LIST_ITEM_ADD',
      name,
    });
}

export function removeTodoListItem(id) {
  return (dispatch) =>
    dispatch({
      type: 'TODO_LIST_ITEM_REMOVE',
      id,
    });
}
*/
