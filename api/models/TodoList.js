/**
 * TodoList.js
 *
 * @description :: List of todo items
 * @docs        :: <EMPTY>
 */

export default {
  schema: true,
  attributes: {
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
