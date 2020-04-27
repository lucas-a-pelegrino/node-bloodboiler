const { usersRepository } = require('../../repositories');
const { queryHelper } = require('../../helpers');

module.exports.list = async (options) => {
  const query = queryHelper(options);

  query[0].$facet.data.push({ $project: { password: 0, __v: 0 } });

  const [{ metadata, data }] = await usersRepository.list(query);
  const totalPages = Math.ceil(metadata.total / options.perPage);

  return {
    metadata: {
      ...metadata,
      totalPages,
      ...(options.page > 1 && { previousPage: options.page - 1 }),
      ...(options.page < metadata.total && options.page < totalPages && { nextPage: options.page + 1 }),
    },
    data,
  };
};
