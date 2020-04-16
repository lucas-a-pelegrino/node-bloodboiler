const { User } = require('../models');

module.exports = {
  list: (query) => User.aggregate(query).project({ password: false, __v: false }),
  getById: (id) => User.findById(id),
  get: (params) => User.findOne(params),
  create: (params) => User.create(params),
  update: (user) => user.save(),
  delete: (id) => User.findByIdAndDelete(id),
};
