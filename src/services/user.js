const {
  getUsers,
  getUserById,
  createUser,
} = require('../repositories');

module.exports = {
  getUsers: filters => getUsers(filters),

  getUserById: id => getUserById(id),

  createUser: createUser(),
};
