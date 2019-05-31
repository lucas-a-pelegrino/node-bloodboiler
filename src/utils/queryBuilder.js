const { ApplicationError } = require('../lib/errors');

module.exports = {
  /**
   * Query Builder
   * @param {Object} conditions - Search conditions for the query.
   * @param {Array} projection - Requested fields for the query. Example: [ 'name', 'email' ]
   * @param {Object} options - Accepts skip, limit, sort.
   */
  queryBuilder: (conditions = null, projection = null, options = { skip: 0, limit: 10, sort: { createdAt: 1 } }) => { // eslint-disable-line
    const pipeline = [];

    // Validate conditions type: must be of type OBJECT and content must match model attributes.
    if (conditions) {
      if (typeof conditions !== 'object') {
        throw new ApplicationError('search-condition-must-be-of-type-object', 422);
      }

      const match = {
        $match: {},
      };

      Object.keys(conditions).forEach((element) => {
        match.$match[element] = new RegExp(conditions[element], 'i');
      });

      pipeline.push(match);
    }

    // Validate projection type: must be of type ARRAY and content must match model attributes.
    if (projection) {
      if (!Array.isArray(projection)) {
        throw new ApplicationError('search-projection-must-be-of-type-array', 422);
      }

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