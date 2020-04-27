const { usersRepository } = require('../../repositories');
const { queryHelper } = require('../../helpers');

module.exports.list = async (options) => {
  const query = queryHelper(options);

  query[0].$facet.data.push({ $project: { password: 0, __v: 0 } });

  const [{ metadata, data }] = await usersRepository.list(query);

  return {
    metadata: {
      ...metadata,
      totalPages: Math.ceil(metadata.total / options.perPage),
      ...(options.page > 1 && { previousPage: options.page - 1 }),
      ...(options.page < metadata.total && { nextPage: options.page + 1 }),
    },
    data,
  };
};
