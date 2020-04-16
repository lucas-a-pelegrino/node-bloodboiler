# Node API Bloodboiler

[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde) [![GitHub Release](https://img.shields.io/github/v/release/lucas-a-pelegrino/node-bloodboiler?sort=semver)]() [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://opensource.org/licenses/MIT)

A API boilerplate built on top of ExpressJS.

### Features

- **Database:** NoSQL with [MongoDB](https://www.mongodb.com)/[Mongoose](https://mongoosejs.com)
- **Authentication**: TODO;
- **Logging:** TODO;
- **Testing:** Unit/Integration Tests running with [Jest](https://jestjs.io);
- **Error handling:** Basic error handler;
- **HTTP Security:** TODO
- **Code coverage**: [Coveralls](https://coveralls.io)
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
