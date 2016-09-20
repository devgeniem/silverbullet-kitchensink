import jwToken from '../services/jwToken';

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
        var params = req.params.all();

        if (!params.email || !params.password) {
            return res.json(401, {key: 'required_fields_missing', text: 'Email and password required'});
        }

        User.findOne({email: params.email}).exec(function (err, user) {
            if (!user) {
                return res.json(401, {key: 'invalid_credentials', text: 'Invalid email or password'});
            }

            if (user.comparePassword(params.password)) {
                res.json({
                    user: user,
                    token: jwToken.issue({
                        id : user.id,
                        role: user.role
                    })
                });
            } else {
                return res.json(401, {key: 'invalid_credentials', text: 'Invalid email or password'});
            }
        });
    }
};
