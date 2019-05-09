const { getUsers } = require('../../repositories');

module.exports = {
  getUsers: () => {
    try {
      // TODO: Create query builder service to filter, find data based on the user criteria.
      return getUsers();
    } catch (error) {
      throw error;
    }
  },
};
