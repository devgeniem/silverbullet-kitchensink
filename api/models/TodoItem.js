/**
 * TodoItem.js
 *
 * @description :: Todo item user can mark as completed
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

export default {
  schema: true,
  attributes: {
/*    owner: {
      model: 'user',
      required: true,
    },*/
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
    todolist: {
      model: 'todolist',
    },
  },
};
