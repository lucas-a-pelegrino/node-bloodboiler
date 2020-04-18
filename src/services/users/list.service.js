const { usersRepository } = require('../../repositories');
const { queryHelper } = require('../../helpers');

module.exports.list = async (options) => {
  const query = queryHelper(options);

  query[0].$facet.data.push({ $project: { password: 0, __v: 0 } });

  const [response] = await usersRepository.list(query);

  return response;
};
