/**
 * TodoItem.js
 *
 * @description :: Todo item user can mark as completed
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
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
  },
};
