const { Token } = require('../models');

module.exports = {
  get: (params) => Token.findOne(params),
  create: (params) => Token.create(params),
  update: (token) => token.save(),
};
