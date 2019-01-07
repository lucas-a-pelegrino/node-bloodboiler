const {
  authenticateUser,
} = require('../../services');

module.exports = {
  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const auth = await authenticateUser(email, password);
      // TODO: Create service that saves user meta to db.
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
