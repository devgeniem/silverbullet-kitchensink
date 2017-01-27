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

  const loginUser = data =>
    api.login(data)
      .then(response => dispatch({ type: Types.LOGIN_USER, response }));

  const registerUser = data =>
    api.post('/user', { name: data.name, email: data.email, password: data.password })
      .then(response => dispatch({ type: Types.REGISTER_USER, response }));

  const logoutUser = () => dispatch({ type: Types.LOGOUT_USER });

  const activate = (user, code) =>
    api.post('/user/activate/' + user, { activationCode: code })
      .then(() => dispatch({ type: Types.Types.ACTIVATE }));

  return {
    deleteList,
    createList,
    modifyList,
    refreshLists,
    changeLanguage,
    loginUser,
    registerUser,
    logoutUser,
    activate,
  };
};
