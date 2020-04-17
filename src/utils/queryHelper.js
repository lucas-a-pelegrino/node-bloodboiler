module.exports.queryHelper = (options) => {
  const currentPage = parseInt(options.currentPage, 10);
  const pipeline = [
    {
      $facet: {
        metadata: [
          { $count: 'total' },
          { $addFields: { currentPage, totalPages: Math.ceil(currentPage / options.limit) } },
        ],
        data: [],
      },
    },
    { $unwind: '$metadata' },
  ];

  if (options.skip) {
    pipeline[0].$facet.data.push({
      $skip: parseInt(options.skip, 10),
    });
  } else {
    pipeline[0].$facet.data.push({
      $skip: 0,
    });
  }

  if (options.limit) {
    pipeline[0].$facet.data.push({
      $limit: parseInt(options.limit, 10),
    });
  } else {
    pipeline[0].$facet.data.push({
      $limit: 10,
    });
  }

  return pipeline;
};
