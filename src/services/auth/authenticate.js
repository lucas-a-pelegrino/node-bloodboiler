const {
  getUserByEmail,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');

module.exports = {
  authenticate: async (email, password, meta = null) => {
    if (!email || !password) {
      throw new Error('missing-email-or-password');
    }

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error('user-not-found');
      }

      if (!encryptor.comparePassword(password, user.password)) {
        throw new Error('password-invalid');
      }

      if (meta) {
        await updateUser(user.id, {
          meta,
        });
      }

      const token = encryptor.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        user,
        token,
      };
    } catch (error) {
      return error;
    }
  },
};
