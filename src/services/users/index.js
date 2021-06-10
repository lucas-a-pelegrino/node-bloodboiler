const { create } = require('./create.service');
const { list } = require('./list.service');
const { get } = require('./get.service');
const { getBy } = require('./getBy');
const { update } = require('./update.service');
const { destroy } = require('./destroy.service');

module.exports = {
  list,
  get,
  getBy,
  create,
  update,
  destroy,
};
