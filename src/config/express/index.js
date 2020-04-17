const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swagger = require('swagger-ui-express');
require('dotenv').config();

const database = require('../database/mongodb');
const routes = require('../../routes');
const swaggerDocs = require('../swagger/swagger.json');
const { errorTracker, errorHandler } = require('../../middlewares');
const { ApplicationError, logger, morgan } = require('../../utils');

const {
  [process.env.NODE_ENV]: { version, corsOptions },
} = require('../env');

const app = express();
database.connect();

app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/documentation', swagger.serve);
app.use('/documentation', swagger.setup(swaggerDocs));

Object.keys(routes).forEach((key) => app.use(`/api/${version}/${key}`, routes[key]));

app.use((req, res, next) => {
  next(new ApplicationError(404, 'Resource Not Found'));
});

app.use(errorTracker);
app.use(errorHandler);

const unexpectedErrorCatcher = (error) => {
  logger.error(error);
  process.exit(1);
};

process.on('unhandledRejection', unexpectedErrorCatcher);
process.on('uncaughtException', unexpectedErrorCatcher);

module.exports = app;
