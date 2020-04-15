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
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: '',
      pass: '',
    },
  },
  database: {
    name: 'node-bloodboiler-development',
    host: 'localhost',
    port: '27017',
    user: '',
    password: '',
  },
};
