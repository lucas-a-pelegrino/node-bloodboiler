# Node API Bloodboiler

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7a7eafd4c4c145faad8aece85c786b2d)](https://www.codacy.com/manual/lucas.assuncao.p/node-bloodboiler?utm_source=github.com&utm_medium=referral&utm_content=lucas-a-pelegrino/node-bloodboiler&utm_campaign=Badge_Grade) [![Coverage Status](https://coveralls.io/repos/github/lucas-a-pelegrino/node-bloodboiler/badge.svg?branch=master)](https://coveralls.io/github/lucas-a-pelegrino/node-bloodboiler?branch=master) [![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde) [![GitHub Release](https://img.shields.io/github/v/release/lucas-a-pelegrino/node-bloodboiler?sort=semver)]() [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://opensource.org/licenses/MIT)

A API boilerplate built on top of ExpressJS.

### Features

- **Database:** NoSQL with [MongoDB](https://www.mongodb.com)/[Mongoose](https://mongoosejs.com)
- **Authentication**: TODO;
- **Logging:** Logging info with [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan);
- **Testing:** Unit/Integration Tests running with [Jest](https://jestjs.io);
- **Error handling:** Centralized error handling middleware;
- **HTTP Security:** TODO
- **Code coverage**: [Coveralls](https://coveralls.io)/[Codacy](https://www.codacy.com)
- **Linting:** [ESLint](https://eslint.org)/[Prettier](https://prettier.io)
- **API Documentation:** [Swagger](https://swagger.io)/[Postman](https://www.postman.com)

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

# debug (VSCode)
$ npm run start:debug
$ yarn start:debug
```

Testing

```sh
# Run tests
$ npm test
$ yarn test

# Run tests with coverage
$ npm run test:coverage
$ yarn test:coverage
```

## License

[MIT](https://opensource.org/licenses/MIT)
