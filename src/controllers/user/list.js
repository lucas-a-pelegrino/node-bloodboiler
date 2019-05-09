const {
  getUsers,
} = require('../../services/user');

module.exports = {
  list: async (req, res) => {
    try {
      const users = await getUsers();
      const count = users.length;
      res.status(200).json({ data: users, count });
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
