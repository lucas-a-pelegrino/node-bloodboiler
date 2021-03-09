module.exports.messages = {
  notFound: (resource) => `${resource}-not-found`,
  alreadyExists: (param) => `${param}-already-registered`,
  invalidFields: 'invalid-fields',
  invalidPassword: 'invalid-password',
  expiredToken: 'jwt-expired',
  invalidAuthFormat: `invalid-authorization-format`,
  authMissing: `missing-authorization-header`,
  internalError: 'internal-server-error',
};
