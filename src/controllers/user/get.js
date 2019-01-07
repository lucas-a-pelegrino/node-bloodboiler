const {
  getUserById,
} = require('../../services/user');

module.exports = {
  get: async (req, res) => {
    const { _id } = req.params;

    try {
      const user = await getUserById(_id);
      res.status(200).json({
        user,
      });
    } catch (error) {
      console.error(error); // eslint-disable-line
      res.status(500).json({
        errors: [error],
      });
    }
  },
};
