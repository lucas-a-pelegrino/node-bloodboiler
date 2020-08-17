const httpStatus = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError, jwt } = require('../../utils');
const userService = require('../users/update.service');

module.exports.resetPassword = async (token, newPassword) => {
  const user = await usersRepository.get({ passwordResetToken: token });
  if (!user) {
    throw new ApplicationError('User not found', httpStatus.NOT_FOUND);
  }

  jwt.verify(token, (err) => {
    if (err) {
      throw new ApplicationError('Token Expired', httpStatus.UNAUTHORIZED);
    }
  });

  await userService.update(user._id, { password: newPassword, passwordResetToken: null });
};
