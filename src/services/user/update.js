const { updateUser } = require('../../repositories');

module.exports = {
  updateUserById: (id, params) => updateUser(id, params),
};
