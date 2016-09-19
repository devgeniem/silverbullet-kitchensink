export function saveItem(name) {

  console.log('saveItem & createListActions', name);

  return (dispatch) =>
    dispatch({
      type: 'ITEM_SAVE',
      name
    });
}

export function removeItem(id) {
  return (dispatch) =>
    dispatch({
      type: 'ITEM_REMOVE',
      id,
    });
}
