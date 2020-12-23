# Node API Bloodboiler :rocket:

![Build](https://github.com/lucas-a-pelegrino/node-bloodboiler/workflows/Build/badge.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/7a7eafd4c4c145faad8aece85c786b2d)](https://www.codacy.com/manual/lucas.assuncao.p/node-bloodboiler?utm_source=github.com&utm_medium=referral&utm_content=lucas-a-pelegrino/node-bloodboiler&utm_campaign=Badge_Grade) [![codecov](https://codecov.io/gh/lucas-a-pelegrino/node-bloodboiler/branch/develop/graph/badge.svg)](https://codecov.io/gh/lucas-a-pelegrino/node-bloodboiler) [![GitHub Release](https://img.shields.io/github/v/release/lucas-a-pelegrino/node-bloodboiler?sort=semver)]() [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://opensource.org/licenses/MIT) [![sequelized version](https://img.shields.io/badge/bloodboiler-sequelized-blue)](https://github.com/lucas-a-pelegrino/node-bloodboiler-sequelized)

> A API boilerplate built on top of ExpressJS.

## Features

- **Database:** NoSQL with [MongoDB](https://www.mongodb.com)/[Mongoose](https://mongoosejs.com);
- **Authentication**: Authenticate users with [JWT](https://jwt.io);
- **Logs:** Logging info with [Winston](https://github.com/winstonjs/winston)/[Morgan](https://github.com/expressjs/morgan);
- **Tests:** Unit/Integration Tests running with [Jest](https://jestjs.io);
- **Error handling:** Centralized error handling middleware;
- **Security:**
  - [CORS](https://github.com/expressjs/cors) enabled;
  - Secured HTTP headers using [Helmet](https://helmetjs.github.io);
  - Protecting requests against xss;
  - Data validation middleware using [Yup](https://github.com/jquense/yup)
- **Code Analisys**: [Codecov](https://codecov.io)/[Codacy](https://www.codacy.com);
- **Linting:** [ESLint](https://eslint.org)/[Prettier](https://prettier.io);
- **API Documentation:** [Swagger](https://swagger.io)/[Postman](https://www.postman.com);
- **[Docker](https://docker.com) Support**

> This boilerplate is also available with Sequelize/PostgreSQL on this [repository](https://github.com/lucas-a-pelegrino/node-bloodboiler-sequelized)!

## Getting Started

### Installation Steps

Clone the repository

```sh
$ git clone https://github.com/lucas-a-pelegrino/node-bloodboiler
$ cd node-bloodboiler
```

Install the dependencies

```sh
$ npm install
# or
$ yarn install
```

Setup environment variables (modify/add more variables if needed)

```sh
$ cp .env.example .env
```

### Commands

Start application

```sh
# locally:
$ npm run start:dev
$ yarn start:dev

# staging:
$ npm run start:staging
$ yarn start:staging

# production
$ npm start
$ yarn start
```

Testing

```sh
# Run tests
$ npm test
$ yarn test
```

### Docker

Bloodboiler comes with Docker support, you can develop and test your code using Docker for minimal configuration, Nodemon takes care of restarting the the application inside Docker so you can code locally.

```sh
# Code Locally with:
$ npm run docker:dev
$ yarn docker:dev

# Run Test Suites inside Docker:
$ npm run docker:test
$ yarn docker:test
```

> NOTE: In order to use the methods listed above, make sure you have Docker installed on your local machine!

## Documentation

You might want to check the API docs as well!

- Collection on [Postman](https://documenter.getpostman.com/view/2660803/S1TN61BV);
- Swagger: Just start the application at your desired `host:port` and use the route: `/api/v1/documentation` to open the swagger docs;

## License

[MIT](https://opensource.org/licenses/MIT)
