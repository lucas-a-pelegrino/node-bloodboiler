const nodemailer = require('nodemailer');

const {
  baseUrl,
  mailAuth,
} = require(`../config/env/${process.env.NODE_ENV}`); //eslint-disable-line

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
              ${baseUrl}/users/${user.passwordResetToken}/reset-password\n
              If you have not request for this, contact your system administrator.`,
        html: `<span>You have request a password reset, access the link below to update your password:</span>
              <br>
              <span>${baseUrl}/users/${user.passwordResetToken}/reset-password</span>
              <br>
              <hr>
              <span><b>ATENTION</b> If you have not request for this, contact your system administrator.</span>`,
      };

      return transporter.sendMail(message);
    } catch (error) {
      throw error;
    }
  },
};
