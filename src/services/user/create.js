const {
  getUserBy,
  createUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const { ApplicationError } = require('../../lib/errors');

module.exports = {
  createUser: async (params) => {
    try {
      const user = await getUserBy({ email: params.email });
      if (user) {
        throw new ApplicationError('email-already-in-use', 409);
      }

      params.password = encryptor.hashPassword(params.password); // eslint-disable-line

      return createUser(params);
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  },
};
