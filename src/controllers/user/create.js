const {
  createUser,
} = require('../../services/user');

module.exports = {
  create: async (req, res) => {
    const params = req.body;

    try {
      const user = await createUser(params);
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
