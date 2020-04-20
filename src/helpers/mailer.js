const { transporter } = require('../utils');
const {
  [process.env.NODE_ENV]: {
    email: { from },
  },
} = require('../config/env');

module.exports.mailer = {
  dispatchMail: async (to, subject, content) => {
    const email = {
      from,
      to,
      subject,
      text: content.text,
      html: content.html,
    };

    return transporter.sendMail(email);
  },
};
