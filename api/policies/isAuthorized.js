import jwToken from '../services/jwToken';

/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

export default function (req, res, next) {
    var token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {key: 'not_logged', text: 'Format is Authorization: Bearer [token]'});
        }
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        return res.json(401, {key: 'not_logged', text: 'No Authorization header was found'});
    }

    jwToken.verify(token, function (err, token) {
        if (err) return res.json(401, {key: 'not_logged', text: 'Invalid Token!'});
        if (token.role !== 'superadmin' && !token.organizationId) return res.json(401, {key: 'no_organization', text: 'User has no organization'});
        req.user = token; // Decrypted token payload (issued at AuthController)
        next();
    });
};
