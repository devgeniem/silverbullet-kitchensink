/**
 * TodoList.js
 *
 * @description :: List of todo items
 * @docs        :: <EMPTY>
 */

export default {

  attributes: {
    // id: { type: 'number', autoIncrement: true }, // <-- for SQL databases
    // id: { type: 'string', columnName: '_id' }, // <-- for MongoDB
    /* user: {
      model: 'user',
    },*/
    title: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 256,
    },
    items: {
      collection: 'todoitem',
    },
  },
};
