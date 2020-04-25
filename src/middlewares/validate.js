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
    const errors = {};
    error.inner.forEach((error) => {
      const [outerKey, innerKey] = error.path.split('.');
      errors[outerKey] = { [innerKey]: error.message };
    });
    next(new ApplicationError('Invalid Fields', 400, true, '', errors));
  }
};
