/**
* Bootstrap
* (sails.config.bootstrap)
*
* An asynchronous bootstrap function that runs before your Sails app gets lifted.
* This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
*
* For more information on bootstrapping your app, check out:
* http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
*/

var users = [{
  email: 'super@example.com',
  role: 'admin',
  name: 'SuperAdmin',
  password: 'super',
},
];


function ensureUser(user) {
  var password = user.password;
  delete user.password;

  return new Promise((resolve, reject) => {
    User.findOne({ email: user.email })
    .then((found) => {
      if (!found) {
        User.create(user)
        .then((created) => {
          created.newPassword = password;
          return created.save();
        })
        .then(saved => {
          sails.log.info(`User ${user.name} <${user.email}> created`);
          resolve();
        })
        .catch(err => {
          sails.log.warn(err);
          reject(err);
        });
      } else {
        resolve();
      }
    })
    .catch(err => {
      sails.log.warn(err);
      reject(err);
    });
  });
}


module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  var requests = users.map(user => ensureUser(user));
  Promise.all(requests)
  .then(() => cb())
  .catch(cb);
};
