import Types from './Types';

const deleteList = id => ({ type: Types.REMOVE_LIST, id });
const createList = (name, data) => ({ type: Types.CREATE_LIST, name, data });
const modifyList = (id, data) => ({ type: Types.MODIFY_LIST, id, data });
const refreshLists = () => ({ type: Types.REFRESH_LIST });
const registerUser = (data) => ({ type: Types.REGISTER_USER, data });
const loginUser = (data) => ({ type: Types.LOGIN_USER, data })

export default {
  deleteList,
  createList,
  modifyList,
  refreshLists,
  registerUser,
  loginUser
};
