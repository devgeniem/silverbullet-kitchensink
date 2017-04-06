import Hashids from 'hashids';
import bcrypt from 'bcrypt-nodejs';

const hashids = new Hashids('TODO', 6, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export default {
  comparePassword(userId, password) {
    const user = User.findOne({ id: userId });
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
};
