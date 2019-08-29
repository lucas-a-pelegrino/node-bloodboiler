module.exports = {
  /**
   * Query Builder
   * @param {Object} conditions - Search conditions for the query.
   * @param {Array} projection - Requested fields for the query. Example: [ 'name', 'email' ]
   * @param {Object} options - Accepts skip, limit, sort.
   */
  queryBuilder: (conditions, projection, options) => {
    const pipeline = [];

    if (conditions) {
      const match = {
        $match: {},
      };

      Object.entries(conditions).forEach(([key, value]) => {
        match.$match[key] = new RegExp(value, 'i');
      });

      pipeline.push(match);
    }

    if (projection) {
      const project = {
        $project: {},
      };

      projection.forEach((element) => {
        project.$project[element] = 1;
      });

      pipeline.push(project);
    }

    if (options.skip) {
      pipeline.push({
        $skip: parseInt(options.skip, 10),
      });
    } else {
      pipeline.push({
        $skip: 0,
      });
    }

    if (options.limit) {
      pipeline.push({
        $limit: parseInt(options.limit, 10),
      });
    } else {
      pipeline.push({
        $limit: 10,
      });
    }

    if (options.sort) {
      const sort = {
        $sort: {},
      };

      Object.entries(options.sort).forEach(([key, value]) => {
        sort.$sort[key] = parseInt(value, 10);
      });

      pipeline.push(sort);
    } else {
      pipeline.push({
        $sort: {
          createdAt: 1,
        },
      });
    }

    return pipeline;
  },
};
