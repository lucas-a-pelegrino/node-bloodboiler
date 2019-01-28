const {
  updateUserById,
} = require('../../services/user');

module.exports = {
  update: async (req, res) => {
    const { _id } = req.params;
    const params = req.body;

    try {
      const user = await updateUserById(_id, params);
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
