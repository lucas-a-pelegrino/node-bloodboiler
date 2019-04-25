const AppError = require('./appError');

module.exports = class AuthorizationError extends AppError {
  constructor(message, status) {
    super(message || 'an-unknown-error-occurred', status);
  }
};
