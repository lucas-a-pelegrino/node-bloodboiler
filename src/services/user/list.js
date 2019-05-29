const { queryBuilder } = require('../../utils/queryBuilder');
const { getUsers } = require('../../repositories');

module.exports = {
  getUsers: (conditions, projections, options) => {
    try {
      const query = queryBuilder(conditions, projections, options);
      return getUsers(query);
    } catch (error) {
      throw error;
    }
  },
};
