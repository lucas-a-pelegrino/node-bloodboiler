const {
  getUserById,
} = require('../../services/user');

module.exports = {
  get: async (req, res) => {
    const { _id } = req.params;

    try {
      const user = await getUserById(_id);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
