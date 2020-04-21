const jwt = require('jsonwebtoken');

const { secret } = require('../config/env');

module.exports.jwt = {
  issue: (payload) => jwt.sign(payload, secret, { algorithm: 'HS256' }),
  verify: (token, callback) => jwt.verify(token, secret, callback),
};
