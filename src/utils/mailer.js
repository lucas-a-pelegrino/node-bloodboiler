const nodemailer = require('nodemailer');
const {
  baseUrl,
} = require('../config/config');
const {
  mailAuth,
} = require('../config/config');

module.exports = {
  dispatchMail: async (user) => {
    const transporter = nodemailer.createTransport({
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
      const connection = await transporter.verify();
      if (!connection) {
        throw new Error('mailer-connection-failed');
      }

      const message = {
        from: 'APPS <no-reply@ioasys.com.br>',
        to: user.email,
        subject: 'Password Reset',
        text: `You have request a password reset, access the link below to update your password:\n
              ${baseUrl}/password-reset/${user.resetToken}\n
              If you have not request for this, contact your system administrator.`,
        html: `<span>You have request a password reset, access the link below to update your password:</span>
              <br>
              <span>${baseUrl}/password-reset/${user.resetToken}</span>
              <br>
              <hr>
              <span><b>ATENTION</b> If you have not request for this, contact your system administrator.</span>`,
      };

      const dispatcher = await transporter.sendMail(message);

      return dispatcher;
    } catch (error) {
      return error;
    }
  },
};
