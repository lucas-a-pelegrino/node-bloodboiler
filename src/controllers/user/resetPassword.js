const { resetPasswordByToken } = require('../../services/user');

module.exports = {
  resetPassword: async (req, res) => {
    const { token } = req.params;
    const {
      password,
      passwordConfirmation,
    } = req.body;

    try {
      const result = await resetPasswordByToken(token, password, passwordConfirmation);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
