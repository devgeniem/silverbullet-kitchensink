import Types from './Types';
import api from '../services/api';

export default (dispatch) => {
  const deleteList = id =>
    api.del('/todo-list/'+id)
      .then(response => dispatch({ type: Types.REMOVE_LIST, response }));

  const createList = data =>
    api.post('/todo-list', { title: data.title, items: JSON.stringify(data.items) })
      .then(response => dispatch({ type: Types.CREATE_LIST, response }));

  const modifyList = (id, data) =>
    api.put('/todo-list/'+id, { title: data.title, items: JSON.stringify(data.items) })
      .then(() => dispatch({ type: Types.MODIFY_LIST }));

  const refreshLists = () =>
    api.get('/todo-lists')
      .then(data => dispatch({ type: Types.REFRESH_LIST, data }));

  const changeLanguage = (lang) => dispatch({ type: Types.CHANGE_LANGUAGE, lang });

  return {
    deleteList,
    createList,
    modifyList,
    refreshLists,
    changeLanguage,
  };
};
