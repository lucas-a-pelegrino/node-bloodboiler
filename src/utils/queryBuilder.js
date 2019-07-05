module.exports = {
  queryBuilder: (conditions = null, projection = null, options = { skip: 0, limit: 10, sort: { createdAt: 1 } }) => { // eslint-disable-line
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
        const skip = {
          $skip: parseInt(options.skip, 10),
        };

        pipeline.push(skip);
      }

      if (options.limit) {
        const limit = {
          $limit: parseInt(options.limit, 10),
        };
        pipeline.push(limit);
      }

      if (options.sort) {
        const sort = {
          $sort: {},
        };

        Object.keys(options.sort).forEach((element) => {
          sort[element] = options.sort[element];
        });

        pipeline.push(sort);
      }
    }

    // TODO: Model associations: populate, search and filters.

    return pipeline;
  },
};
