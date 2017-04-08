import Hashids from 'hashids';

const hashids = new Hashids('TODO', 6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default {
  schema: true,
  attributes: {
    // id: { type: 'number', autoIncrement: true }, // <-- for SQL databases
    // id: { type: 'string', columnName: '_id' }, // <-- for MongoDB
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
    password: {
      type: 'string',
    },
    active: {
      type: 'boolean',
      defaultsTo: false,
    },
    activationCode: {
      type: 'string',
    },
  },
  beforeCreate: function (user, next) {
    //user is not active by default
    user.active = true;
    //give person activation code
    user.activationCode = hashids.encode(new Date().getTime(), Math.round(Math.random() * 1024));
    // Encrypt new password
    user.password = UserService.generatePasswordHash(user.password);
    next();
  },
};
