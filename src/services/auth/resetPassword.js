const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const ErrorHandler = require('../../lib/errors');

module.exports = {
  resetPassword: async (email) => {
    if (!email) {
      throw new ErrorHandler.AuthorizationError('missing-email');
    }

    try {
      const user = await getUserBy({ email });
      if (!user) {
        throw new ErrorHandler.ApplicationError('user-not-found', 404);
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
