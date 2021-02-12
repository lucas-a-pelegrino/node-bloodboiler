const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { secret } = require('../config/env');
const { ApplicationError } = require('./ApplicationError');

module.exports = {
  signToken: (payload, options) => jwt.sign(payload, secret, options),
  verifyToken: (token) => {
    return jwt.verify(token, secret, { algorithms: ['HS384', 'HS256'] }, (err, decoded) => {
      if (err) {
        const message = err.message.replace(/\s/g, '-');

        if (err.name === 'TokenExpiredError') {
          return { expired: true };
        }
        throw new ApplicationError(message, StatusCodes.UNAUTHORIZED);
      }

      return decoded;
    });
  },
};
