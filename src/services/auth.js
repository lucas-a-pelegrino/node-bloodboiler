const { getUserByEmail } = require('../repositories');
const { encryptor } = require('../utils');

module.exports = {
  authenticateUser: async (email, password) => {
    if (!email || !password) {
      throw new Error('missing-email-or-password', 401);
    }

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error('user-not-found');
      }

      if (!encryptor.comparePassword(password, user.password)) {
        throw new Error('password-invalid');
      }

      const token = encryptor.generateToken({ id: user.id, name: user.name, email: user.email });
      return { user, token };
    } catch (error) {
      return error;
    }
  },
};
