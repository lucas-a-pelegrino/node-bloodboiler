const httpStatus = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError, messages } = require('../../utils');

module.exports.create = async (params) => {
  const userExists = await usersRepository.get({ email: params.email });
  if (userExists) {
    throw new ApplicationError(messages.alreadyExists('email'), httpStatus.CONFLICT);
  }

  return usersRepository.create(params);
};
