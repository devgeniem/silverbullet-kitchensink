// get index from array of item that has prop: val
function getIndexByPropVal(arr, prop, val) {
    var index;
     if (arr && arr.forEach) {
        arr.forEach((item, i) => {
            if (item[prop] === val) index = i;
        });
    }
    return index;
}

// get copy of array without item that has prop: val
function removeItemByPropVal(arr, prop, val) {
     if (arr && arr.forEach) {
        var index = getIndexByPropVal(arr, prop, val);
        if (index !== undefined) {
            return [...arr.slice(0, index), ...arr.slice(index+1)];
        } else {
            return arr;
        }
    }   
}

export default function notificationReducer(state = { notifications: [] }, action) {
  switch(action.type) {
    case 'ADD_NOTIFICATION':
        return Object.assign({}, { notifications: [ ...state.notifications, { id: action.id, style: action.style, message: action.message } ]});
    case 'REMOVE_NOTIFICATION':
        return Object.assign({}, { notifications: removeItemByPropVal(state.notifications, 'id', action.id) });
    default:
        return state;
  }
}
