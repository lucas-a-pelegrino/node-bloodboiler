const { deleteUser } = require('../../repositories');

module.exports = {
  deleteUserById: id => deleteUser(id),
};
