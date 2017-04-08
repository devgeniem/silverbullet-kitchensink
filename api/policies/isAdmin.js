/**
 * isAdmin
 *
 * @description :: Policy to check if user is admin
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

export default (req, res, next) => {
  if (req.user && req.user.role && req.user.role === 'admin') {
    return next();
  }
  return res.json(401, { key: 'not_admin', text: 'User must be admin or superadmin to perform this action' });
};
