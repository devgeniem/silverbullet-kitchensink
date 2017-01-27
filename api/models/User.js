import Hashids from 'hashids';
import bcrypt from 'bcrypt-nodejs';

var hashids = new Hashids('TODO', 6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default {
  schema: true,
  attributes: {
    role: {
      type: 'string',
      enum: ['admin', 'user'],
    },
    email: {
      type: 'email',
      unique: true,
      required: true,
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
    comparePassword: function (password) {
      return bcrypt.compareSync(password, this.encryptedPassword);
    },
    newActivationCode: function () {
      this.activationCode = hashids.encode(new Date().getTime(), Math.round(Math.random() * 1024));
      this.save();
      return this.activationCode;
    },
    // We don't wan't to send back encrypted password
    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      //delete obj.activationCode;
      return obj;
    },
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
