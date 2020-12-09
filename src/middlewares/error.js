const { StatusCodes } = require('http-status-codes');
const { ApplicationError, logger } = require('../utils');
const { messages } = require('../helpers');

const errorTracker = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApplicationError)) {
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || messages.internalError;
    error = new ApplicationError(message, status, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { status, message } = err;

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    status = StatusCodes.INTERNAL_SERVER_ERROR;
    message = messages.internalError;
  }

  res.locals.errorMessage = err.message;

  if (['development', 'staging'].includes(process.env.NODE_ENV)) {
    logger.error(err);
  }
  res.status(status).json({
    name: err.name,
    message,
    ...(err.status === StatusCodes.BAD_REQUEST && { errors: err.errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorTracker,
  errorHandler,
};
