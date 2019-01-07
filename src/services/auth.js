const { getUserByEmail } = require('../repositories');
const encryptor = require('../utils/encryptor');

module.exports = {
  authenticateUser: async (email, password) => {
    if (!email || !password) {
      throw new Error('missing-email-or-password');
    }

    try {
      const user = await getUserByEmail(email);
      let token;
      if (!user) {
        throw new Error('user-not-found');
      }

      if (encryptor.comparePassword(password, user.password)) {
        token = encryptor.generateToken({ name: user.name, email: user.email });
      }

      return { user, token };
    } catch (error) {
      return error;
    }
  },
};
