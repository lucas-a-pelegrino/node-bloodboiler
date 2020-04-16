const { usersService } = require('../services');

module.exports = {
  list: async (req, res) => {
    try {
      const { skip, limit, currentPage = 1 } = req.query;
      const response = await usersService.list({ skip, limit, currentPage });

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(error.status).json({
        name: error.name,
        messages: [error.message],
      });
    }
  },

  create: async (req, res) => {
    try {
      const { body } = req;
      const response = await usersService.create(body);

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(error.status).json({
        name: error.name,
        messages: [error.message],
      });
    }
  },
};
