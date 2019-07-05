const {
  deleteUserById,
} = require('../../services/user');

module.exports = {
  destroy: async (req, res) => {
    const { _id } = req.params;

    try {
      await deleteUserById(_id);
      res.status(200).json({
        message: 'user-successfully-deleted',
      });
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
