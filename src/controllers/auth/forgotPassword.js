const {
  resetPassword,
} = require('../../services/auth');
const { mailer } = require('../../utils');

module.exports = {
  forgotPassword: async (req, res) => {
    const { email } = req.params;

    try {
      const user = await resetPassword(email);
      mailer.dispatchMail(user);
      res.status(200).json({
        message: 'email-sent',
      });
    } catch (error) {
      res.status(500).json({
        errors: [error],
      });
    }
  },
};
