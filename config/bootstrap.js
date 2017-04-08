/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.com/config/bootstrap
 */

var users = [{
  email: 'admin@example.com',
  role: 'admin',
  name: 'Admin',
  password: 'password',
}];


function ensureUser(user) {
  return new Promise((resolve, reject) => {
    return User.findOne({ email: user.email })
    .then((found) => {
      if (!found) {
        return User.create(user).meta({fetch: true})
        .then(() => {
          sails.log.info(`User ${user.name} <${user.email}> created`);
          return resolve();
        })
        .catch((err) => {
          sails.log.warn(err);
          return reject(err);
        });
      }
      return resolve();
    })
    .catch((err) => {
      sails.log.warn(err);
      return reject(err);
    });
  });
}


module.exports.bootstrap = function (cb) {
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  var requests = users.map(user => ensureUser(user));
  return Promise.all(requests)
    .then(() => {
      sails.log.info('**************************************************');
      sails.log.info('* DEFAULT LOGIN (created @ /config/bootstrap.js) *');
      sails.log.info('* ---------------------------------------------- *');
      sails.log.info('* Email    : admin@example.com                   *');
      sails.log.info('* Password : password                            *');
      sails.log.info('**************************************************');
      return cb();
    })
    .catch(cb);
};
