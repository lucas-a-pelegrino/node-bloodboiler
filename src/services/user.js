const {
  getUsers,
} = require('../repositories');

module.exports = {
  getUsers: filters => getUsers(filters),
};
