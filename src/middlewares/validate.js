const yup = require('yup');
const { pick } = require('lodash');
const { ApplicationError } = require('../utils');

module.exports = (schema) => async (req, res, next) => {
  const requestSchema = pick(schema.fields, ['params', 'query', 'body']);
  const requestObject = pick(req, Object.keys(requestSchema));

  const validated = await schema.validate(requestObject, {
    stripUnknown: true,
    abortEarly: false,
  });

  next();
};
