const { catchAsync } = require('../utils');
const { usersService } = require('../services');

module.exports = {
  list: catchAsync(async (req, res) => {
    const { page, perPage } = req.query;
    const response = await usersService.list({ page, perPage });

    if (!response || response.data.length === 0) {
      return res.status(204).end();
    }

    return res.status(200).json(response);
  }),

  get: catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await usersService.get(id);
    return res.status(200).json(response);
  }),

  create: catchAsync(async (req, res) => {
    const { body } = req;
    const response = await usersService.create(body);

    return res.status(200).json(response);
  }),

  update: catchAsync(async (req, res) => {
    const {
      params: { id },
      body,
    } = req;
    const response = await usersService.update(id, body);
    return res.status(200).json(response);
  }),

  destroy: catchAsync(async (req, res) => {
    const { id } = req.params;
    await usersService.destroy(id);
    return res.status(204).end();
  }),
};
