const { usersRepository } = require('../../repositories');
const { queryHelper } = require('../../utils');

module.exports.list = async (options) => {
  const query = queryHelper(options);

  const response = await usersRepository.list(query);

  return response;
};
