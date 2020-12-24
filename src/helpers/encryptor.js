const bcrypt = require('bcryptjs');
const { jwt } = require('../utils');

module.exports.encryptor = {
  hashPassword: (password) => bcrypt.hash(password, 8),
  comparePassword: (password, userPassword) => bcrypt.compare(password, userPassword),
  generateToken: (payload, options) => jwt.issue(payload, options),
};
