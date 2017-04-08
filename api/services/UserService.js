import Hashids from 'hashids';
import bcrypt from 'bcrypt-nodejs';

const hashids = new Hashids('TODO', 6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default {
  comparePassword(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
  },

  newActivationCode(userId) {
    const activationCode = hashids.encode(
      new Date().getTime(),
      Math.round(Math.random() * 1024),
    );
    User.update(
      { id: userId },
      { activationCode },
    );
    return activationCode;
  },

  generatePasswordHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
};
