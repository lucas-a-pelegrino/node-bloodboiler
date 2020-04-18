module.exports = {
  baseUrl: `http://localhost:3001`,
  version: 'v1',
  secret: 'b19aa5c2dfeb3fae917140794c9eed35bf831df83ffe9b13549a177db561fee123c6346a386a58133e5eb4ba2950b2bf',
  resetTokenExpiresTime: 5,
  resetTokenExpiresTimeFormat: 'seconds',
  corsOptions: {
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  mailAuth: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  database: {
    name: 'node-bloodboiler-test',
    host: 'localhost',
    port: '27017',
    user: '',
    password: '',
  },
};
