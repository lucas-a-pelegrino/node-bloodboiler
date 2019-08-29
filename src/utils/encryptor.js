const bcrypt = require('bcrypt-nodejs');
const jwt = require('./jwt');

module.exports = {
  hashPassword: password => bcrypt.hashSync(password),
  comparePassword: (password, userPassword) => bcrypt.compareSync(password, userPassword),
  generateToken: user => jwt.issue({ user }),
  generateRandString: () => Math.random().toString(36).substring(2, 15),
};
