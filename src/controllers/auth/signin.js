const {
  authenticate,
} = require('../../services/auth');

module.exports = {
  signin: async (req, res) => {
    const { email, password, meta } = req.body;

    try {
      const auth = await authenticate(email, password, meta);
      return res.status(200).json({
        auth,
      });
    } catch (error) {
      // TODO: Implement custom error handler for authenticaiton failure.
      return res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
