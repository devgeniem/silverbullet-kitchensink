/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

export default {
  /**
   * @api {get} /auth/user authenticate user
   * @apiName Authenticate user
   * @apiGroup Auth
   *
   * @apiSuccess {Object} User and token data
   *
   * @apiDescription
   * Authenticate user and get access_token
   */
  user: function (req, res) {
    var params = req.allParams();

    if (!params.email || !params.password) {
      return res.status(401).json({ key: 'required_fields_missing', text: 'Email and password required' });
    }

    return User.findOne({ email: params.email }).exec((err, user) => {
      if (!user) {
        return res.status(401).json({ key: 'invalid_credentials', text: 'Invalid email or password' });
      }

      if (UserService.comparePassword(user.password, params.password)) {
        return res.status(200).json({
          user,
          token: TokenService.issue({
            id: user.id,
            role: user.role,
          }),
        });
      }
      return res.status(401).json({ key: 'invalid_credentials', text: 'Invalid email or password' });
    });
  },

};
