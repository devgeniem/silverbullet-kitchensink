/**
 * TodoList.js
 *
 * @description :: List of todo items
 * @docs        :: <EMPTY>
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
    items: {
      collection: 'todoitem',
    },
  },
};
