import Types from './Types';


export default (dispatch) => {

  const deleteList = id => ({ type: Types.REMOVE_LIST, id });
  const createList = (data) => {
    var promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        console.log("types"  ,Types);
        var action = { type: Types.CREATE_LIST, data };
        console.log(action);
        dispatch(action);
      }, 500);
    });
    return promise;
  };
  const modifyList = (id, data) => ({ type: Types.MODIFY_LIST, id, data });
  const refreshLists = () => ({ type: Types.REFRESH_LIST });

  return {
    deleteList,
    createList,
    modifyList,
    refreshLists,
  };
};
