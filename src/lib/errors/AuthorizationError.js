const ApplicationError = require('./ApplicationError');

module.exports = class AuthorizationError extends ApplicationError {
  constructor(message, status) {
    super(message || 'an-unknown-error-occurred', status);
  }
};
