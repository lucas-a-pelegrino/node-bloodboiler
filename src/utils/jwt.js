const jwt = require('jsonwebtoken');
const {
  secret,
} = require('../config/config');

module.exports = {
  issue: payload => jwt.sign(payload, secret, { algorithm: 'HS256' }),

  verify: (token, callback) => jwt.verify(token, secret, callback),
};
