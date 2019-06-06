const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const { ApplicationError } = require('../../lib/errors');

module.exports = {
  authenticate: async (email, password, meta = null) => {
    if (!email || !password) {
      throw new ApplicationError('missing-email-or-password', 403);
    }

    try {
      const user = await getUserBy({ email });
      if (!user) {
        throw new ApplicationError('user-not-found', 404);
      }

      if (!encryptor.comparePassword(password, user.password)) {
        throw new ApplicationError('password-invalid', 401);
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
      throw error;
    }
  },
};
