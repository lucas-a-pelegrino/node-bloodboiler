const { transporter } = require('../utils');
const {
  email: { from },
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
