import Hashids from 'hashids';
import bcrypt from 'bcrypt-nodejs';

const hashids = new Hashids('TODO', 6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default {
  schema: true,
  attributes: {
    role: {
      type: 'string',
      isIn: ['admin', 'user'],
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
      isEmail: true,
    },
    name: {
      type: 'string',
    },
    encryptedPassword: {
      type: 'string',
    },
    active: {
      type: 'boolean',
      defaultsTo: false,
    },
    activationCode: {
      type: 'string',
    },
    // We don't wan't to send back encrypted password
/*    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      //delete obj.activationCode;
      return obj;
    },*/
  },
  beforeCreate: function (user, next) {
    //user is not active by default
    user.active = false;
    //give person activation code
    user.activationCode = hashids.encode(new Date().getTime(), Math.round(Math.random() * 1024));
    // Encrypt new password
    user.encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    next();
  },
  beforeUpdate: function (newUserData, next) {
    //user id has to be in update request body, see policies.js

    // Encrypt new password
    if (newUserData.hasOwnProperty('id') && newUserData.hasOwnProperty('newPassword')) {
      newUserData.encryptedPassword = bcrypt.hashSync(newUserData.newPassword, bcrypt.genSaltSync(10));
    }

    next();
  },
};
