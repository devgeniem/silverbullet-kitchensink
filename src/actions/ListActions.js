import { createTypes } from 'reduxsauce';
import api from '../services/api';

export const Types = createTypes(`
  CREATE_LIST
  REMOVE_LIST
  MODIFY_LIST
  REFRESH_LIST
`);

export default (dispatch) => {
  const deleteList = id =>
    api.del('/todo-list/'+id)
      .then(response => dispatch({ type: Types.REMOVE_LIST, response }))
      .catch(error => dispatch({ type: Types.REMOVE_LIST, error }));

  const createList = data =>
    api.post('/todo-list', { title: data.title, items: JSON.stringify(data.items) })
      .then(response => dispatch({ type: Types.CREATE_LIST, response }))
      .catch(error => dispatch({ type: Types.CREATE_LIST, error }));

  const modifyList = (id, data) =>
    api.put('/todo-list/' + id, { title: data.title, items: JSON.stringify(data.items) })
      .then(() => dispatch({ type: Types.MODIFY_LIST }))
      .catch(error => dispatch({ type: Types.MODIFY_LIST, error }));

  const refreshLists = () =>
    api.get('/todo-lists')
      .then(data => dispatch({ type: Types.REFRESH_LIST, data, error: null }))
      .catch(error => dispatch({ type: Types.REFRESH_LIST, error }));

  return {
    deleteList,
    createList,
    modifyList,
    refreshLists,
  };
};
