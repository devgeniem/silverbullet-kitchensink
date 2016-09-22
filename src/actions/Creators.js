import Types from './Types';

const deleteList = id => ({ type: Types.REMOVE_LIST, id });
const createList = (name, data) => ({ type: Types.CREATE_LIST, name, data });
const modifyList = (id, data) => ({ type: Types.MODIFY_LIST, id, data });
const refreshLists = () => ({ type: Types.REFRESH_LIST });

export default {
  deleteList,
  createList,
  modifyList,
  refreshLists,
};
