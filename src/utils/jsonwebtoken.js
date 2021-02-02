const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { secret } = require('../config/env');
const { ApplicationError } = require('./ApplicationError');

module.exports.jwt = {
  issue: (payload, options) => jwt.sign(payload, secret, options),
  verify: (token) =>
    jwt.verify(token, secret, { algorithms: ['HS384', 'HS256'] }, (err, decoded) => {
      if (err) {
        const message = err.message.replace(/\s/g, '-');
        throw new ApplicationError(message, StatusCodes.UNAUTHORIZED);
      }

      return decoded;
    }),
};
