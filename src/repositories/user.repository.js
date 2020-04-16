const { User } = require('../models');

module.exports = {
  list: (query) => User.aggregate(query),
  getById: (id) => User.findById(id),
  get: (params) => User.findOne(params),
  update: (id, params) => User.findByIdAndUpdate(id, params),
  delete: (id) => User.findByIdAndDelete(id),
};
