const httpStatus = require('http-status-codes');
const { ApplicationError, logger } = require('../utils');

const errorTracker = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApplicationError)) {
    const status = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    error = new ApplicationError(message, status, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { status, message } = err;

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = err.message;

  if (['development', 'staging'].includes(process.env.NODE_ENV)) {
    logger.error(err);
  }
  res.status(status).json({
    name: err.name,
    message,
    ...(err.status === httpStatus.BAD_REQUEST && { errors: err.errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorTracker,
  errorHandler,
};
