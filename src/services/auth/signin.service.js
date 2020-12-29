const { StatusCodes } = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const accessTokensService = require('../accessTokens/create.service');
const { ApplicationError } = require('../../utils');
const { encryptor, messages } = require('../../helpers');

module.exports.signin = async (email, password) => {
  const user = await usersRepository.get({ email });
  if (!user) {
    throw new ApplicationError(messages.notFound('user'), StatusCodes.NOT_FOUND);
  }

  const isPasswordValid = await encryptor.comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApplicationError(messages.invalidPassword, StatusCodes.UNAUTHORIZED);
  }

  const payload = {
    sub: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };

  return accessTokensService.create(payload);
};
