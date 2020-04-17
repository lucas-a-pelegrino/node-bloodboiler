const { ApplicationError } = require('../utils');

const errorTracker = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApplicationError)) {
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApplicationError(message, status, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { status, message } = err;

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    status = 500;
    message = 'Internal Server Error';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(status).json({
    name: err.name,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorTracker,
  errorHandler,
};
