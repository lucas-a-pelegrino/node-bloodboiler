module.exports = {
  clientURL: process.env.CLIENT_URL,
  version: 'v1',
  secret: process.env.JWT_SECRET,
  resetTokenExpiresTime: process.env.RESET_TOKEN_EXPIRES_TIME,
  resetTokenExpiresTimeFormat: process.env.RESET_TOKEN_EXPIRES_TIME_FORMAT,
  corsOptions: {
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  email: {
    from: process.env.MAIL_FROM,
    auth: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
