const { StatusCodes } = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const tokensService = require('../tokens/create.service');
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
    id: user._id,
  };

  return tokensService.create(payload);
};
