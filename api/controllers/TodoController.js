/**
 * TodoController
 *
 * @description :: Server-side logic for managing todo lists and items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /todo-lists get todo lists
   * @apiName lists
   * @apiGroup Todo
   *
   * @apiSuccess {Array} Todo lists
   *
   * @apiDescription
   * Get todo lists
   */
  findLists: (req, res) => TodoList
    .find({})
    .populate('items')
    .sort('createdAt DESC')
    .then(res.ok)
    .catch(res.serverError),

  /**
   * @api {delete} /todo-list/:id remove todo list
   * @apiName remove todo list
   * @apiGroup Todo
   *
   * @apiParam {String} id Todo list ID
   *
   * @apiSuccess {Boolean} Remove status
   *
   * @apiDescription
   * Remove todo list
   */
  destroyList: (req, res) => {
    const params = req.allParams();

    return TodoList
      .destroy({ id: params.id })
      .then(() => {
        res.ok(true);
      })
      .catch(res.serverError);
  },

  /**
   * @api {post} /todo-list create todo list
   * @apiName create todo list
   * @apiGroup Todo
   *
   * @apiParam {String} title Todo list title
   * @apiParam {Array} items Todo list items
   *
   * @apiSuccess {Object} TodoList item
   *
   * @apiDescription
   * Create new todo list
   */
  createList: (req, res) => {
    const params = req.allParams();
    const items = JSON
      .parse(params.items)
      .map(item => ({ title: item.title, completed: false }));

    let todoListResponse;

    TodoList
      .create({ title: params.title })
      .meta({ fetch: true })
      .then((response) => {
        todoListResponse = response;
        return TodoItem
          .createEach(items)
          .meta({ fetch: true });
      })
      .then(itemsResponse => TodoList
        .replaceCollection(todoListResponse.id, 'items')
        .members(itemsResponse.map(i => i.id)),
      )
      .then(() => TodoList.findOne({ id: todoListResponse.id }))
      .then(res.ok)
      .catch(res.serverError);
  },

  modifyList: (req, res) => {
    const params = req.allParams();
    const items = JSON
      .parse(params.items)
      .map(item => ({ title: item.title, completed: false }));

    return TodoList
      .update({ id: params.id }, { title: params.title })
      .then(() => TodoItem
        .destroy({ owner: params.id }),
      )
      .then(() => TodoItem
        .createEach(items)
        .meta({ fetch: true }),
      )
      .then(itemsResponse => TodoList
        .replaceCollection(params.id, 'items')
        .members(itemsResponse.map(i => i.id)),
      )
      .then(() => TodoList.findOne({ id: params.id }))
      .then(res.ok)
      .catch(res.serverError);
  },

  /**
   * @api {delete} /todo-item/:id remove todo item
   * @apiName remove todo item
   * @apiGroup Todo
   *
   * @apiParam {String} id Todo item ID
   *
   * @apiSuccess {Boolean} Remove status
   *
   * @apiDescription
   * Remove todo item
   */
  destroyItem: (req, res) => {
    const params = req.allParams();

    return TodoItem
      .destroy({ id: params.id })
      .then(res.ok)
      .catch(res.serverError);
  },

  /**
   * @api {post} /todo-item create todo item
   * @apiName create todo item
   * @apiGroup Todo
   *
   * @apiParam {String} title Todo item title
   *
   * @apiSuccess {Object} TodoItem item
   *
   * @apiDescription
   * Create new todo item
   */
  createItem: (req, res) => {
    const params = req.allParams();

    return TodoItem
      .create({ title: params.title, completed: false })
      .then(res.ok)
      .catch(res.serverError);
  },

  /**
   * @api {put} /todo-item/:id update todo item by id
   * @apiName update todo item by id
   * @apiGroup Todo
   *
   * @apiParam {String} id Todo item ID
   * @apiParam {String} title Todo item title
   * @apiParam {Boolean} completed Completion status
   *
   * @apiSuccess {Object} Updated todo item
   *
   * @apiDescription
   * Update todo item by id
   */
  updateItem: (req, res) => {
    const params = req.allParams();
    const data = {};

    if (params.title) data.title = params.title;
    if (params.completed) data.completed = params.completed;

    return TodoItem.update({ id: params.id }, data)
      .then(res.ok)
      .catch(res.serverError);
  },

};
