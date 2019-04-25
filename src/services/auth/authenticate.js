const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const ErrorHandler = require('../../lib/errors');

module.exports = {
  authenticate: async (email, password, meta = null) => {
    if (!email || !password) {
      throw new ErrorHandler.AuthorizationError('missing-email-or-password', 400);
    }

    try {
      const user = await getUserBy({ email });
      if (!user) {
        throw new ErrorHandler.AuthorizationError('user-not-found', 404);
      }

      if (!encryptor.comparePassword(password, user.password)) {
        throw new ErrorHandler.AuthorizationError('password-invalid', 401);
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
