module.exports.queryHelper = (options) => {
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

  return pipeline;
};
