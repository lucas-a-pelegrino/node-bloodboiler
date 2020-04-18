const moment = require('moment');

const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { encryptor } = require('../../helpers');
const userService = require('../users/update.service');

const {
  [process.env.NODE_ENV]: { resetTokenExpiresTime, resetTokenExpiresTimeFormat },
} = require('../../config/env');

module.exports.forgotPassword = async (email) => {
  const user = await usersRepository.get({ email });
  if (!user) {
    throw new ApplicationError('User not found', 404);
  }

  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment()
      .add(resetTokenExpiresTime, resetTokenExpiresTimeFormat)
      .unix(),
  };

  const token = await encryptor.generateToken(payload);
  await userService.update(user._id, { passwordResetToken: token });
};
