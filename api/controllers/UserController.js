export default {

  /**
  * @api {get} /users users
  * @apiName users
  * @apiGroup User
  *
  * @apiSuccess {Object} user list
  *
  * @apiDescription
  * Get organization user list
  */
  find: function (req, res) {
    var criterias = {};
    User.find(criterias)
    .then(res.ok)
    .catch(res.serverError);
  },

  /**
  * @api {get} /user/:id profile
  * @apiName profile
  * @apiGroup User
  *
  * @apiParam {String} id User ID
  *
  * @apiSuccess {Object} User profile
  *
  * @apiDescription
  * Get user profile
  */
  findOne: function (req, res) {
    var params = req.params.all();
    User.findOne({ id: params.id })
    .then(res.ok)
    .catch(res.serverError);
  },

  /**
  * @api {post} /user user
  * @apiName create user
  * @apiGroup User
  *
  * @apiParam {String} name Name
  * @apiParam {String} email Email
  * @apiParam {String} password Password
  *
  * @apiSuccess {Object} User
  *
  * @apiDescription
  * Create new user
  */
  create: function (req, res) {
    var params = req.params.all();

    var data = { role: 'user' };
    if (params.name) data.name = params.name;
    if (params.email) data.email = params.email;
    if (params.password) data.password = params.password;

    User.create(data)
    .then((createdUser) => {
      EmailService.sendUserActivationMail(createdUser);
      res.ok(createdUser);
    })
    .catch((err) => {
      if (/already\sexists/m.test(err)) {
        res.json(403, {
          key: 'already_exists',
          text: 'User with that email already exists',
        });
      } else {
        res.serverError(err);
      }
    });
  },

  /**
  * @api {put} /user/:id update user by id
  * @apiName update user by id
  * @apiGroup User
  *
  * @apiParam {String} id User ID
  * @apiParam {String} role Role (admin/user)
  * @apiParam {String} email Email
  * @apiParam {String} name Name
  *
  * @apiSuccess {Object} Updated user
  *
  * @apiDescription
  * Update user profile by id, requires admin/superadmin privileges
  */
  update: function (req, res) {
    var params = req.params.all();

    var data = {};
    if (params.role) data.role = params.role;
    if (params.email) data.email = params.email;
    if (params.name) data.name = params.name;

    User.update({ id: params.id }, data)
    .then((updated) => {
      res.ok(updated[0]);
    })
    .catch(res.serverError);
  },

  /**
  * @api {delete} /user/:id remove user
  * @apiName remove user
  * @apiGroup User
  *
  * @apiParam {String} id User ID
  *
  * @apiSuccess {Boolean} Remove status
  *
  * @apiDescription
  * Remove user, requires admin/superadmin privileges
  */
  destroy: function (req, res) {
    var params = req.params.all();
    User.destroy({ id: params.id })
    .then(() => {
      res.ok(true);
    })
    .catch(res.serverError);
  },

  /**
  * @api {post} /register/:id/:activationCode handle user activation link
  * @apiName handle user activation link
  * @apiGroup User
  *
  * @apiParam {String} id User ID
  *
  * @apiDescription
  * Redirects user to root application
  */
  handleActivation: function (req, res) {
    var params = req.params.all();


    User.findOne({ id: params.id })
    .then((User) => {
      if (User) {
        if (!User.active && User.activationCode === params.activationCode) {
          User.active = true;
          req.session.user = params.id;
          return User.save()
          .then(() => res.redirect('/'))
          .catch(res.serverError);
        }
        return res.forbidden({
          key: 'invalid_code_or_activation',
          text: 'User is already activated or activation code is invalid',
        });
      }
      return res.notFound({
        key: 'not_found',
        text: 'User not found',
      });
    })

    .catch(res.serverError);
  },


  /**
  * @api {get} /user/activate/:id activate
  * @apiName activate
  * @apiGroup User
  *
  * @apiParam {String} id User ID
  * @apiParam {String} activationCode Activation code
  *
  * @apiSuccess {Boolean} Activation successful
  *
  * @apiDescription
  * Activate user and save password
  */
  activate: function (req, res) {
    var params = req.params.all();

    return User.findOne({ id: params.id })
    .then((User) => {
      if (User) {
        if (!User.active && User.activationCode === params.activationCode) {
          User.active = true;
          return User.save()
          .then(() => res.ok(true))
          .catch(res.serverError);
        }
        return res.forbidden({
          key: 'invalid_code_or_activation',
          text: 'User is already activated or activation code is invalid',
        });
      }
      return res.notFound({
        key: 'not_found',
        text: 'User not found',
      });
    })
    .catch(res.serverError);
  },

};
