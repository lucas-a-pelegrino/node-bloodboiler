const { resetPasswordByToken } = require('../../services/user');

module.exports = {
  resetPassword: async (req, res) => {
    const token = req.param('token');
    const {
      password,
      passwordConfirmation,
    } = req.body;

    try {
      const result = await resetPasswordByToken(token, password, passwordConfirmation);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
