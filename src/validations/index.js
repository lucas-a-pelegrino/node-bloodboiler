const { users } = require('./users.validation');
const { auth } = require('./auth.validation');

module.exports.validationSchemas = {
  users,
  auth,
};
