const ApplicationError = require('./ApplicationError');

module.exports = class AuthorizationError extends ApplicationError {
  constructor(message) {
    super(message, 401);
  }
};
