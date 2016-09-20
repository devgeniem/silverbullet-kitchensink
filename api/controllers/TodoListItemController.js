/**
 * TodoListItemController
 *
 * @description :: Server-side logic for managing list items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @api {get} /list-items listitems
   * @apiName listitems
   * @apiGroup ListItem
   *
   * @apiSuccess {Object} Array of ListItems
   *
   * @apiDescription
   * Get ListItems
   */
  find: function (req, res) {
    var params = req.params.all();
    TodoListItem.find({}).sort('createdAt DESC')
      .then(res.ok)
      .catch(res.serverError);
  },

  /**
   * @api {delete} /list-item/:id remove ListItem
   * @apiName remove ListItem
   * @apiGroup ListItem
   *
   * @apiParam {String} id ListItem ID
   *
   * @apiSuccess {Boolean} Remove status
   *
   * @apiDescription
   * Remove listitem
   */
  destroy: function (req, res) {
    var params = req.params.all();
    TodoListItem.destroy({ id: params.id })
      .then(() => {
        res.ok(true);
      })
      .catch(res.serverError);
  },

  /**
   * @api {post} /list-item listitem
   * @apiName create listitem
   * @apiGroup ListItem
   *
   * @apiParam {String} name ListItem name
   *
   * @apiSuccess {Object} ListItem
   *
   * @apiDescription
   * Create new listitem
   */
  create: function (req, res) {
    const params = req.params.all();

    TodoListItem.create({ name: params.name })
      .then(res.ok)
      .catch(res.serverError);
  },

};
