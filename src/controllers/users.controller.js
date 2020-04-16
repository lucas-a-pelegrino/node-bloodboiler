const { usersService } = require('../services');

module.exports = {
  list: async (req, res) => {
    try {
      const { skip, limit, currentPage = 1 } = req.query;
      const response = await usersService.list({ skip, limit, currentPage });

      if (response.metadata.length === 0) {
        return res.status(204).end();
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).json({
        name: error.name,
        messages: [error.message],
      });
    }
  },

  create: async (req, res) => {
    try {
      const { body } = req;
      const response = await usersService.create(body);

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(error.status || 500).json({
        name: error.name,
        messages: [error.message],
      });
    }
  },
};
