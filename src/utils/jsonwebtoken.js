const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { secret } = require('../config/env');
const { messages } = require('../helpers/messages');
const { ApplicationError } = require('./ApplicationError');

module.exports = {
  signToken: (payload, options) => jwt.sign(payload, secret, options),
  verifyToken: (token) => {
    return jwt.verify(token, secret, { algorithms: ['HS384', 'HS256'] }, (err, decoded) => {
      if (err) {
        const message = err.message.replace(/\s/g, '-');

        if (err.name === 'TokenExpiredError') {
          throw new ApplicationError(messages.expiredToken, StatusCodes.FORBIDDEN);
        } else {
          throw new ApplicationError(message, StatusCodes.UNAUTHORIZED);
        }
      }

      return decoded;
    });
  },
};
