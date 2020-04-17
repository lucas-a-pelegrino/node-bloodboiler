module.exports = {
  baseUrl: `http://localhost:${process.env.PORT}`,
  version: 'v1',
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
