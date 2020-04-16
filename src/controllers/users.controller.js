const { usersService } = require('../services');

module.exports = {
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
