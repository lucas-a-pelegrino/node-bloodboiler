const {
  updateUserById,
} = require('../../services/user');

module.exports = {
  update: async (req, res) => {
    const { _id } = req.params;
    const params = req.body;

    try {
      const user = await updateUserById(_id, params);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
