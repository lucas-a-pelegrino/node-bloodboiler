const { list } = require('./list');
const { get } = require('./get');
const { create } = require('./create');
const { update } = require('./update');
const { destroy } = require('./destroy');
const { resetPassword } = require('./resetPassword');

module.exports = {
  list,
  get,
  create,
  update,
  destroy,
  resetPassword,
};
