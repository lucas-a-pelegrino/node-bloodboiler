const nodemailer = require('nodemailer');

const {
  [process.env.NODE_ENV]: { mailAuth },
} = require('../config/env');

module.exports = {
  dispatchMail: async (content) => {
    const transpoter = nodemailer.createTransport({
      pool: true,
      host: mailAuth.host,
      port: mailAuth.port,
      secure: true,
      auth: {
        user: mailAuth.auth.user,
        pass: mailAuth.auth.pass,
      },
    });

    try {
      const connection = await transpoter.verify();
      if (!connection) {
        throw new Error('mailer-connection-failed');
      }

      transpoter.sendMail(content);
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  },
};
