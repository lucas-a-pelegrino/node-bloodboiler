const {
  forgotPassword,
} = require('../../services/auth');
const { mailer } = require('../../utils');

module.exports = {
  forgotPassword: async (req, res) => {
    const { email } = req.params;

    try {
      const user = await forgotPassword(email);
      mailer.dispatchMail(user);
      res.status(200).json({
        message: 'email-sent',
      });
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
