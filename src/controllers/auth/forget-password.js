const {
  resetUserPassword,
} = require('../../services');
const { mailer } = require('../../utils');

module.exports = {
  forgetPassword: async (req, res) => {
    const email = req.param('email');

    try {
      const user = await resetUserPassword(email);
      const response = await mailer.dispatchMail(user);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        errors: [error],
      });
    }
  },
};
