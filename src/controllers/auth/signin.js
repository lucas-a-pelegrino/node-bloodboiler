const {
  authenticateUser,
  updateUserById,
} = require('../../services');

module.exports = {
  signin: async (req, res) => {
    const { email, password, meta } = req.body;

    try {
      const auth = await authenticateUser(email, password, meta);
      return res.status(200).json({
        auth,
      });
    } catch (error) {
      // TODO: Implement custom error handler for authenticaiton failure.
      return res.status(500).json({
        errors: [error],
      });
    }
  },
};
