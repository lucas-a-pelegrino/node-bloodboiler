const {
  getUserBy,
  createUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const ErrorHandler = require('../../lib/errors');

module.exports = {
  createUser: async (params) => {
    try {
      const user = await getUserBy({ email: params.email });
      if (user) {
        throw new ErrorHandler.ApplicationError('email-already-in-use', 403);
      }

      params.password = encryptor.hashPassword(params.password); // eslint-disable-line

      return createUser(params);
    } catch (error) {
      throw error;
    }
  },
};
