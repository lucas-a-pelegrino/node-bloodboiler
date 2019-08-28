const jwt = require('jsonwebtoken');

const {
  secret,
} = require(`../config/env/${process.env.NODE_ENV}`); //eslint-disable-line

module.exports = {
  issue: payload => jwt.sign(payload, secret, { algorithm: 'HS256' }),
  verify: (token, callback) => jwt.verify(token, secret, callback),
};
