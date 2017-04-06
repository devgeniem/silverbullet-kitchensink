/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function(req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, { key: 'not_logged', text: 'Format is Authorization: Bearer [token]' });
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, { key: 'not_logged', text: 'No Authorization header was found' });
  }

  return TokenService.verify(token, (err, extractedData) => {
    if (err) return res.json(401, { key: 'not_logged', text: 'Invalid Token!' });
    if (extractedData.role !== 'superadmin' && !extractedData.organizationId) {
      return res.json(401, { key: 'no_organization', text: 'User has no organization' });
    }
    req.user = extractedData; // Decrypted token payload (issued at AuthController)
    return next();
  });
}
