const yup = require('yup');
const { pick } = require('lodash');
const { ApplicationError } = require('../utils');

module.exports = (schema) => async (req, res, next) => {
  const requestObject = pick(req, Object.keys(schema));

  try {
    const value = await yup
      .object()
      .shape(schema)
      .validate(requestObject, { stripUnknown: true, abortEarly: false });

    Object.assign(req, value);
    next();
  } catch (error) {
    const message = error.errors.join(', ');
    next(new ApplicationError(message, 400));
  }
};
