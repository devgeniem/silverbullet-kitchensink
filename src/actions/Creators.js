import Types from './Types';
import api from '../services/api';

export default (dispatch) => {

  const deleteList = id => ({ type: Types.REMOVE_LIST, id });
  const createList = data => api.post('/todo-list', data).then(data => dispatch({ type: Types.CREATE_LIST, data }));
/*    var promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        console.log("types"  ,Types);
        var action = { type: Types.CREATE_LIST, data };
        console.log(action);
        dispatch(action);
      }, 500);
    });
    return promise;
  };*/
  const modifyList = (id, data) => ({ type: Types.MODIFY_LIST, id, data });
  const refreshLists = () => api.get('/todo-lists').then(data => dispatch({ type: Types.REFRESH_LIST, data }));

  return {
    deleteList,
    createList,
    modifyList,
    refreshLists,
  };
};
