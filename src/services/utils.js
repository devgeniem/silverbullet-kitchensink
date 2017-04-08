// get index from array of item that has prop: val
export function getIndexByPropVal(arr, prop, val) {
  var index;
  if (arr && arr.forEach) {
    arr.forEach((item, i) => {
      if (item[prop] === val) index = i;
    });
  }
  return index;
}

// get copy of array without item that has prop: val
export function removeItemByPropVal(arr, prop, val) {
  if (arr && arr.forEach) {
    var index = getIndexByPropVal(arr, prop, val);
    if (index !== undefined) {
      return [...arr.slice(0, index), ...arr.slice(index+1)];
    }
  }
  return arr;
}
