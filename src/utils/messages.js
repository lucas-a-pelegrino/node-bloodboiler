module.exports.messages = {
  notFound: (resource) => `${resource}-not-found`,
  invalidPassword: 'invalid-password',
  expiredToken: 'expired-token',
  alreadyExists: (param) => `${param}-already-registered`,
  invalidAuthFormat: `invalid-authorization-format`,
  authMissing: `missing-authorization-header`,
};
