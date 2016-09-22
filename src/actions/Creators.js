import Types from './Types';
import api from '../services/api';


const registerUser = (data) => ({ type: Types.REGISTER_USER, data });
const loginUser = (data) => ({ type: Types.LOGIN_USER, data })

export default (dispatch) => {
  const deleteList = id => ({ type: Types.REMOVE_LIST, id });
  const createList = data => api.post('/todo-list', { title: data.title, items: JSON.stringify(data.items) }).then(response => dispatch({ type: Types.CREATE_LIST, response }));
  const modifyList = (id, data) => ({ type: Types.MODIFY_LIST, id, data });
  const refreshLists = () => api.get('/todo-lists').then(data => dispatch({ type: Types.REFRESH_LIST, data }));
  const loginUser = data => api.login(data).then(response => dispatch({ type: Types.LOGIN_USER, response }));
  const registerUser = data => api.post('/register', { email: data.email, password: data.password }).then(response => dispatch({ type: Types.REGISTER_USER, response }));

  return {
    deleteList,
    createList,
    modifyList,
    refreshLists,
    loginUser,
    registerUser,
  };
};
