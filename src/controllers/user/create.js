const {
  createUser,
} = require('../../services/user');

module.exports = {
  create: async (req, res) => {
    const params = req.body;

    try {
      const user = await createUser(params);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
