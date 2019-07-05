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

      Object.keys(conditions).forEach((element) => {
        match.$match[element] = new RegExp(conditions[element], 'i');
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

    if (options) {
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

        Object.keys(options.sort).forEach((element) => {
          sort[element] = options.sort[element];
        });

        pipeline.push(sort);
      } else {
        pipeline.push({
          $sort: {
            createdAt: 1,
          },
        });
      }
    }

    // TODO: Model associations: populate, search and filters.

    return pipeline;
  },
};
