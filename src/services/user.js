const {
  getUsers,
  getUserById,
  // getUserByEmail,
  createUser,
  updateUser,
} = require('../repositories');
const encryptor = require('../utils/encryptor');

module.exports = {
  getUsers: () => getUsers(),

  getUserById: id => getUserById(id),

  createUser: (params) => {
    try {
      // TODO: Validate email uniqueness
      // const user = getUserByEmail(params.email);
      // if (user) return { errors: ['email-already-in-use'] };
      params.password = encryptor.hashPassword(params.password); // eslint-disable-line
      return createUser(params);
    } catch (error) {
      console.error(error); // eslint-disable-line
      return error;
    }
  },

  updateUserById: (id, params) => updateUser(id, params),
};
