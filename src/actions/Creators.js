import Types from './Types';
import api from '../services/api';

export default (dispatch) => {
  const deleteList = id => ({ type: Types.REMOVE_LIST, id });
  const createList = data => api.post('/todo-list', { title: data.title, items: JSON.stringify(data.items) }).then(response => dispatch({ type: Types.CREATE_LIST, response }));
  const modifyList = (id, data) => ({ type: Types.MODIFY_LIST, id, data });
  const refreshLists = () => api.get('/todo-lists').then(data => dispatch({ type: Types.REFRESH_LIST, data }));

  return {
    deleteList,
    createList,
    modifyList,
    refreshLists,
  };
};
