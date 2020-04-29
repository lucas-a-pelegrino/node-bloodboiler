module.exports.queryHelper = (options) => {
  const sort = options.sortBy;
  const limit = parseInt(options.perPage, 10);
  const skip = parseInt(options.page, 10);

  const pipeline = [
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [],
      },
    },
    { $unwind: '$metadata' },
  ];

  pipeline[0].$facet.data.push({
    $skip: limit * (skip - 1),
  });

  pipeline[0].$facet.data.push({
    $limit: limit,
  });

  const [sortKey, sortValue] = sort.trim().split(':');
  pipeline[0].$facet.data.push({
    $sort: { [sortKey]: sortValue === 'desc' ? -1 : 1 },
  });

  return pipeline;
};
