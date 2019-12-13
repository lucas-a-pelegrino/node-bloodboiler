const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const swagger = require('swagger-express');
// const createSwaggerMiddleware = require('swagger-express-middleware');
const {
  [process.env.NODE_ENV]: { version, corsOptions },
} = require('../env');
const routes = require('../../routes/v1/routes');
const database = require('../database/mongodb');

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
app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(`/api/${version}`, routes);

module.exports = app;
