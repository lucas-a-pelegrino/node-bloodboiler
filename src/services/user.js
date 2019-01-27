const {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require('../repositories');
const encryptor = require('../utils/encryptor');

module.exports = {
  getUsers: () => getUsers(),

  getUserById: id => getUserById(id),

  createUser: async (params) => {
    try {
      const user = await getUserByEmail(params.email);
      if (user) return { errors: ['email-already-in-use'] };
      params.password = encryptor.hashPassword(params.password); // eslint-disable-line
      return createUser(params);
    } catch (error) {
      return error;
    }
  },

  updateUserById: (id, params) => updateUser(id, params),

  deleteUserById: id => deleteUser(id),
};
