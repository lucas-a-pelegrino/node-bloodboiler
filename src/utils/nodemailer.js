const nodemailer = require('nodemailer');
const { logger } = require('./logger');
const { email } = require('../config/env');

const transporter = nodemailer.createTransport({
  pool: true,
  host: email.auth.host,
  port: email.auth.port,
  secure: true,
  auth: {
    user: email.auth.user,
    pass: email.auth.pass,
  },
});

/* istanbul ignore next */
transporter
  .verify()
  .then(() => logger.info('Successfully connected to the email server...'))
  .catch(() => logger.warn('Server unable to connect, please check your mail configuration.'));

module.exports = transporter;
