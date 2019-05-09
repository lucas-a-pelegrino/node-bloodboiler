const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const ErrorHandler = require('../../lib/errors');

module.exports = {
  resetPasswordByToken: async (token, password, passwordConfirmation) => {
    try {
      if (!token) {
        throw new ErrorHandler.ApplicationError('missing-reset-token', 400);
      }

      const user = await getUserBy({
        passwordResetToken: token,
      });
      if (!user) {
        throw new ErrorHandler.ApplicationError('user-not-found', 404);
      }

      if (password !== passwordConfirmation) {
        throw new ErrorHandler.AuthorizationError('passwords-dont-match');
      }

      if (new Date() >= user.passwordResetTokenExpiresAt) {
        throw new ErrorHandler.AuthorizationError('reset-token-expired');
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
