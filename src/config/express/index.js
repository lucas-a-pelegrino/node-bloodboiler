const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swagger = require('swagger-ui-express');
require('dotenv').config();

const database = require('../database/mongodb');
const routes = require('../../routes');
const swaggerDocs = require('../swagger/swagger.json');

const {
  [process.env.NODE_ENV]: { version, corsOptions },
} = require('../env');

const app = express();
database.connect();

app.set('port', process.env.PORT || 3000);

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

module.exports = app;
