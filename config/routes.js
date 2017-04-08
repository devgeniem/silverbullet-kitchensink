/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /* *************************************************************************
  *                                                                          *
  * Make the view located at `views/sails.dust` your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/sailsapp': {
    view: 'sails',
  },

  'POST /api/session': 'SessionController.session',
  'POST /api/auth/user': 'AuthController.user',
  'POST /api/user': 'UserController.create',
  'POST /api/user/activate/:id': 'UserController.activate',
  'PUT /api/user/:id': 'UserController.update',
  'DELETE /api/user/:id': 'UserController.destroy',

  'GET /api/user': 'UserController.find',
  'GET /api/user/:id': 'UserController.findOne',

  'GET /api/todo-lists': 'TodoController.findLists',
  'POST /api/todo-list': 'TodoController.createList',
  'PUT /api/todo-list/:id': 'TodoController.modifyList',
  'DELETE /api/todo-list/:id': 'TodoController.destroyList',
  'POST /api/todo-item': 'TodoController.createItem',
  'DELETE /api/todo-item/:id': 'TodoController.destroyItem',
  'PUT /api/todo-item/:id': 'TodoController.updateItem',
  'GET /register/:id/:activationCode': 'UserController.handleActivation',

  /* *************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
