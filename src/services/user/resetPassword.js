const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const { ApplicationError } = require('../../lib/errors');

module.exports = {
  resetPasswordByToken: async (token, password, passwordConfirmation) => {
    try {
      if (!token) {
        throw new ApplicationError('missing-reset-token', 422);
      }

      const user = await getUserBy({
        passwordResetToken: token,
      });

      if (!user) {
        throw new ApplicationError('user-not-found', 404);
      }

      if (password !== passwordConfirmation) {
        throw new ApplicationError('passwords-dont-match', 403);
      }

      if (new Date() >= user.passwordResetTokenExpiresAt) {
        throw new ApplicationError('reset-token-expired', 403);
      }
      password = encryptor.hashPassword(password); // eslint-disable-line
      const updatedUser = await updateUser(user.id, {
        password,
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  },
};
