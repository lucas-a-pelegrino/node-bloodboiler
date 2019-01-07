const users = require('./user');
const auth = require('./auth');

module.exports = {
  ...users,
  ...auth,
};
