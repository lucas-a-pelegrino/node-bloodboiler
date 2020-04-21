const { ApplicationError } = require('../utils');

module.exports.queryHelper = (options) => {
  const sort = options.sortBy || 'createdAt:desc';
  const limit = parseInt(options.perPage || 10, 10);
  let skip = parseInt(options.page || 1, 10);

  const pipeline = [
    {
      $facet: {
        metadata: [
          { $count: 'total' },
          { $addFields: { currentPage: skip, totalPages: Math.ceil(skip / limit) } },
        ],
        data: [],
      },
    },
    { $unwind: '$metadata' },
  ];

  skip = limit * (skip - 1);

  pipeline[0].$facet.data.push({
    $limit: limit,
  });

  pipeline[0].$facet.data.push({
    $skip: skip,
  });

  const [sortKey, sortValue] = sort.trim().split(':');
  if (!['asc', 'desc'].includes(sortValue)) {
    throw new ApplicationError("Sort order must be one of the following: 'asc' or 'desc'", 400);
  }

  pipeline[0].$facet.data.push({
    $sort: { [sortKey]: sortValue === 'desc' ? -1 : 1 },
  });

  return pipeline;
};
