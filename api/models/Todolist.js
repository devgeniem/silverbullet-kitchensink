/**
 * Todolist.js
 *
 * @description :: List of todo items
 * @docs        :: <EMPTY>
 */

module.exports = {

  attributes: {
      title:{
        type:"string",
        required:true,
        minLength: 1,
        maxLength: 256
      },
      todoitems:{
        collection:"todoitem",
        via:"owner"
      }
  }
};

