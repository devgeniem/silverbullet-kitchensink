/**
 * TodoItem.js
 *
 * @description :: Todo item user can mark as completed
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // id: { type: 'number', autoIncrement: true }, // <-- for SQL databases
    // id: { type: 'string', columnName: '_id' }, // <-- for MongoDB
    title: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 256,
    },
    completed: {
      type: 'boolean',
      required: true,
    },
    owner: {
      model: 'todolist',
    },
  },
};
