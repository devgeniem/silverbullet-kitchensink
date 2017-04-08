/**
 * TokenService
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken
 */

import jwt from 'jsonwebtoken';

const tokenSecret = 'secretissecet';

export default {

  // Generates a token from supplied payload
  issue(payload) {
    return jwt.sign(
      payload,
      tokenSecret,
      {
        expiresIn: '1d',
      },
    );
  },

  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(
      token,
      tokenSecret,
      {},
      callback,
    );
  },

};
