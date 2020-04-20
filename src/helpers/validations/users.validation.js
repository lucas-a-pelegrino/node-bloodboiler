const yup = require('yup');

const get = {
  query: yup.object().shape({
    page: yup.number().integer(),
    perPage: yup.number().integer(),
  }),
};

module.exports.users = {
  get,
};
