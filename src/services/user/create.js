const {
  getUserByEmail,
  createUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');

module.exports = {
  createUser: async (params) => {
    try {
      const user = await getUserByEmail(params.email);
      if (user) {
        throw new Error('email-already-in-use');
      }
      params.password = encryptor.hashPassword(params.password); // eslint-disable-line
      return createUser(params);
    } catch (error) {
      return error;
    }
  },
};
