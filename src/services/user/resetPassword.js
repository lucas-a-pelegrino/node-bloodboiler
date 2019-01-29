const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');

module.exports = {
  resetPasswordByToken: async (token, password, passwordConfirmation) => {
    try {
      if (!token) {
        throw new Error('missing-reset-token');
      }

      const user = await getUserBy({
        passwordResetToken: token,
      });
      if (!user) {
        throw new Error('user-not-found');
      }

      if (password !== passwordConfirmation) {
        throw new Error('passwords-dont-match');
      }

      if (new Date() >= user.passwordResetTokenExpiresAt) {
        throw new Error('reset-token-expired');
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
