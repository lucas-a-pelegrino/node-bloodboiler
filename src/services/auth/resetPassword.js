const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const AuthorizationError = require('../../lib/errors/AuthorizationError');

module.exports = {
  resetPassword: async (email) => {
    if (!email) {
      throw new AuthorizationError('missing-email', 400);
    }

    try {
      const user = await getUserBy({ email });
      if (!user) {
        throw new AuthorizationError('user-not-found', 404);
      }

      const token = encryptor.generateRandString() + encryptor.generateRandString();
      const expiresAt = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));
      const updated = await updateUser(user.id, {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: expiresAt,
      });

      return updated;
    } catch (error) {
      throw error;
    }
  },
};
