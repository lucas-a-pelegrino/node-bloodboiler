module.exports.ApplicationError = class ApplicationError extends Error {
  constructor(message, status, isOperational = true, stack = '', errors = null) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    this.isOperational = isOperational;

    if (errors) {
      this.errors = errors;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
