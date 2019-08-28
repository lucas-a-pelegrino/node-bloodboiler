const {
  [process.env.NODE_ENV]: { baseUrl },
} = require('../../config/env');

const {
  getUserBy,
  updateUser,
} = require('../../repositories');

const { encryptor, mailer } = require('../../utils');
const { ApplicationError } = require('../../lib/errors');

module.exports = {
  resetPassword: async (email) => {
    try {
      const user = await getUserBy({ email });
      if (!user) {
        throw new ApplicationError('user-not-found', 404);
      }

      const token = encryptor.generateRandString() + encryptor.generateRandString();
      const expiresAt = new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000));
      await updateUser(user.id, {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: expiresAt,
      });

      const content = {
        from: 'APP <no-reply@ioasys.com.br>',
        to: user.email,
        subject: 'Esqueci minha senha',
        text: `${baseUrl}/auth/${token}/password`,
        html: `<span>${baseUrl}/auth/${token}/password</span>`,
      };

      return mailer.dispatchMail(content);
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  },
};
