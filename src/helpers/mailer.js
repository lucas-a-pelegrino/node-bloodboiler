const { transporter } = require('../utils');
const {
  [process.env.NODE_ENV]: {
    email: { from },
    clientURL,
  },
} = require('../config/env');

module.exports.dispatchMail = async (to, subject, content) => {
  const email = {
    from,
    to,
    subject,
    text: `To reset your password, acess the following link: ${clientURL}/reset-password`,
    html: `<span>To reset your password, acess the following link: ${clientURL}/reset-password</span>`,
  };

  return transporter.sendMail(email);
};
