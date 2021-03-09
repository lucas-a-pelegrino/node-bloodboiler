const { StatusCodes } = require('http-status-codes');

const { ApplicationError, jwt } = require('../../utils');
const { messages } = require('../../helpers');

const userService = require('../users');
const { tokensRepository } = require('../../repositories');
const { TokenTypes } = require('../../models');

module.exports.resetPassword = async (token, newPassword) => {
  const resetToken = await tokensRepository.get({ token, tokenType: TokenTypes.reset });

  if (!resetToken) {
    throw new ApplicationError(messages.notFound('token'), StatusCodes.NOT_FOUND);
  }

  const decoded = await jwt.verifyToken(token);

  if (decoded.expired) {
    resetToken.hasExpired = true;
    await tokensRepository.update(resetToken);
  }

  if (resetToken.hasExpired) {
    throw new ApplicationError(messages.expiredToken, StatusCodes.FORBIDDEN);
  }

  await userService.update(decoded.sub.id, { password: newPassword });

  resetToken.hasExpired = true;
  await tokensRepository.update(resetToken);
};
