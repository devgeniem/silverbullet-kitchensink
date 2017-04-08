import Hashids from 'hashids';
import bcrypt from 'bcrypt-nodejs';

const hashids = new Hashids('TODO', 6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default {
  comparePassword(user, password) {
    console.log("compare", password, user.encryptedPassword);
    return bcrypt.compareSync(password, user.encryptedPassword);
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
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log("generate hash", hash, password);
    return hash;
  },
};
