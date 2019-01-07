const bcrypt = require('bcrypt-nodejs');

module.exports = {

  hashPassword: password => bcrypt.hashSync(password),

  comparePassword: (password, userPassword) => bcrypt.compareSync(password, userPassword),

};
