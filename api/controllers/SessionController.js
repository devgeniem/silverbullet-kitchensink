/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

export default {
  /**
   * @api {post} /session Save session to server
   * @apiName Save session
   * @apiGroup Session
   *
   * @apiParam {Object} state Session state
   *
   * @apiSuccess {Object} Session
   *
   * @apiDescription
   * Save session state to server
   */
  session: function (req, res) {
    var params = req.params.all();
    if (!params.state) {
      return res.badRequest({ key: 'required_fields_missing', text: 'Parameter state required' });
    }
    req.session.state = params.state;
    return res.ok(params.state);
  },
};
