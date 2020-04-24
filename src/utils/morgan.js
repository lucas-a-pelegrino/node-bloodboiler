const morgan = require('morgan');
const { logger } = require('./logger');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIPFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIPFormat()}:method :url - :status - :response-time ms - :date[iso]`;
const errorResponseFormat = `${getIPFormat()}:method :url - :status - :response-time ms - message: :message - :date[iso]`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports.morgan = {
  successHandler,
  errorHandler,
};
