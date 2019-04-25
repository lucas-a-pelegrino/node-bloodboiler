const {
  resetPassword,
} = require('../../services/auth');
const { mailer } = require('../../utils');

module.exports = {
  forgotPassword: async (req, res) => {
    const { email } = req.params;

    try {
      const user = await resetPassword(email);
      const response = await mailer.dispatchMail(user);
      res.status(200).json(response);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
