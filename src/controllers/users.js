const usersServices = require('../services/user');

module.exports = {
  list: async (req, res) => {
    try {
      const {
        conditions,
        projection,
        skip,
        limit,
        sort,
      } = req.query;

      const users = await usersServices.getUsers(conditions, projection, { skip, limit, sort });
      const count = users.length;
      res.status(200).json({ data: users, count });
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  get: async (req, res) => {
    const { _id } = req.params;

    try {
      const user = await usersServices.getUserById(_id);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  create: async (req, res) => {
    const params = req.body;

    try {
      const user = await usersServices.createUser(params);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    const { _id } = req.params;
    const params = req.body;

    try {
      const user = await usersServices.updateUserById(_id, params);
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  destroy: async (req, res) => {
    const { _id } = req.params;

    try {
      await usersServices.deleteUserById(_id);
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

  resetPassword: async (req, res) => {
    const { token } = req.params;
    const {
      password,
      passwordConfirmation,
    } = req.body;

    try {
      await usersServices.resetPasswordByToken(token, password, passwordConfirmation);
      res.status(200).json({
        message: 'password-succesfully-reseted',
      });
    } catch (error) {
      res.status(error.status).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
