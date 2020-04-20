const yup = require('yup');

const list = {
  query: yup.object().shape({
    page: yup.number().integer(),
    perPage: yup.number().integer(),
  }),
};

const get = {
  params: yup.object().shape({
    id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'id must be a valid mongo id'),
  }),
};

const create = {
  body: yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/,
        'password must have lower and upper letters, at least one number, and at least one special character',
      )
      .required(),
  }),
};

const update = {
  params: yup.object().shape({
    id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'id must be a valid mongo id'),
  }),
  body: yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup
      .string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/,
        'password must have lower and upper letters, at least one number, and at least one special character',
      ),
  }),
};

const destroy = {
  params: yup.object().shape({
    id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'id must be a valid mongo id'),
  }),
};

module.exports.users = {
  list,
  get,
  create,
  update,
  destroy,
};
