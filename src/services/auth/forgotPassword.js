const {
  getUserBy,
  updateUser,
} = require('../../repositories');
const { encryptor } = require('../../utils');
const { ApplicationError } = require('../../lib/errors');

module.exports = {
  forgotPassword: async (email) => {
    try {
      const user = await getUserBy({ email });
      if (!user) {
        throw new ApplicationError('user-not-found', 404);
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
