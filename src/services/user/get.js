const { getUserById } = require('../../repositories');

module.exports = {
  getUserById: id => getUserById(id),
};
