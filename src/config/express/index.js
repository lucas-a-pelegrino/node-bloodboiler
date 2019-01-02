const express = require('express');
const bodyParser = require('body-parser');
const { version } = require('../config.json');
const routes = require('../../routes');
const database = require('../../lib/database/mongodb');

const app = express();
database.connect();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(`/api/${version}`, routes);

module.exports = app;
