const yup = require('yup');
const { ApplicationError } = require('../utils');

module.exports = (schema) => async (req, res, next) => {
  const requestObject = Object.fromEntries(
    Object.entries(req).filter(([key]) => ['query', 'params', 'body'].includes(key)),
  );

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
