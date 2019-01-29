const {
  resetPassword,
} = require('../../services/auth');
const { mailer } = require('../../utils');

module.exports = {
  forgotPassword: async (req, res) => {
    const email = req.param('email');

    try {
      const user = await resetPassword(email);
      const response = await mailer.dispatchMail(user);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        errors: [error],
      });
    }
  },
};
