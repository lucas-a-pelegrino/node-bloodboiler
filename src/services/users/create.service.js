const { StatusCodes } = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports.create = async (params) => {
  const userExists = await usersRepository.get({ email: params.email });
  if (userExists) {
    throw new ApplicationError(messages.alreadyExists('email'), StatusCodes.CONFLICT);
  }

  return usersRepository.create(params);
};
