const AppError = require('./appError');

module.exports = class AuthorizationError extends AppError {
  constructor(message) {
    super(message || 'an-unknown-error-occurred');
  }
};
