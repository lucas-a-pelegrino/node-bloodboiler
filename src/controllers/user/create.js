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
      if (error.message === 'email-already-in-use') {
        return res.status(403).json({
          errors: [error.message],
        });
      }

      res.status(500).json({
        errors: [error.message],
      });
    }
  },
};
