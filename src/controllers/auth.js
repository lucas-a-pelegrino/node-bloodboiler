const {
  authenticate,
  resetPassword,
} = require('../services/auth');

module.exports = {
  signin: async (req, res) => {
    const { email, password, meta } = req.body;

    try {
      const auth = await authenticate(email, password, meta);
      res.status(200).json({
        auth,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    const { email } = req.params;

    try {
      await resetPassword(email);
      res.status(200).json({
        message: 'email-sent',
      });
    } catch (error) {
      res.status(error.status || 500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
