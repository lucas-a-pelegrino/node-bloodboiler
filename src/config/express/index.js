const express = require('express');
const bodyParser = require('body-parser');
// const swagger = require('swagger-express');
// const createSwaggerMiddleware = require('swagger-express-middleware');
const { version } = require('../config');
const routes = require('../../routes');
const database = require('../../lib/database/mongodb');

const app = express();
database.connect();

app.set('port', process.env.PORT || 3000);
// const host = process.env.HOST || 'localhost';

// app.use(express.static('public'));
// app.use(
//   swagger.init(app, {
//     apiVersion: '1.0',
//     swaggerVersion: '2.0',
//     swaggerURL: '/swagger',
//     swaggerYML: './public/swagger.yml',
//     swaggerUI: './public/swagger/',
//     basePath: host,
//     apis: ['./public/swagger.yml'],
//     middleware: () => {},
//   }),
// );

// createSwaggerMiddleware('./public/swagger.yml', app, (error, middleware) => {
//   app.enable('strict routing');
//   app.use(middleware.metadata());
//   app.use(middleware.parseRequest());
//   app.use(middleware.CORS(), middleware.validateRequest());
//   app.use(bodyParser.json());
//   app.use(
//     bodyParser.urlencoded({
//       extended: false,
//     }),
//   );

//   app.use(`/api/${version}`, routes);
// });
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(`/api/${version}`, routes);

module.exports = app;
