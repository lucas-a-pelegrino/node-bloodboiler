const moment = require('moment');
const { encryptor, mailer } = require('../../helpers');
const userService = require('../users');
const { TokenTypes } = require('../../models');
const { tokensRepository } = require('../../repositories');
const { resetTokenExpiresIn, clientURL } = require('../../config/env');

module.exports.forgotPassword = async (email) => {
  const user = await userService.getBy({ email });

  const token = await encryptor.generateToken(
    {
      sub: {
        id: user._id,
      },
      iat: moment().unix(),
    },
    {
      algorithm: 'HS256',
      expiresIn: resetTokenExpiresIn,
    },
  );

  await tokensRepository.create({
    token,
    userId: user._id,
    tokenType: TokenTypes.reset,
  });

  const mailContent = {
    text: `To reset your password, access the following link: ${clientURL}/${token}/reset-password`,
    html: `<span>To reset your password, access the following link: ${clientURL}/${token}/reset-password</span>`,
  };

  await mailer.dispatchMail(user.email, 'Password Reset Link', mailContent);
};
