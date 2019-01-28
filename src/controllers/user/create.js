const {
  createUser,
} = require('../../services/user');

module.exports = {
  create: async (req, res) => {
    const params = req.body;

    try {
      const user = await createUser(params);
      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(500).json({
        errors: [error],
      });
    }
  },
};
