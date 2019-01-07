const {
  getUsers,
} = require('../../services/user');

module.exports = {
  list: async (req, res) => {
    // const params = req.body;
    // const filters = {
    //   skip: params.skip ? params.skip : 0,
    //   limit: params.limit ? params.limit : 10,
    // };

    try {
      const users = await getUsers();
      const count = users.length;
      res.status(200).json({ data: users, count });
    } catch (error) {
      console.error(error) // eslint-disable-line
      res.status(500).json({
        errors: [error],
      });
    }
  },
};
