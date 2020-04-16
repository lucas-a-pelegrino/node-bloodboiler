const { create } = require('./create.service');
const { list } = require('./list.service');
const { get } = require('./get.service');

module.exports = {
  list,
  get,
  create,
};
