const {
  deleteUserById,
} = require('../../services');

module.exports = {
  destroy: async (req, res) => {
    const { _id } = req.params;

    try {
      await deleteUserById(_id);
      return res.status(200).json({
        message: 'user-successfully-deleted',
      });
    } catch (error) {
      return res.status(500).json({
        errors: [error],
      });
    }
  },
};
