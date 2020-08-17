const httpStatus = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');

module.exports.create = async (params) => {
  const userExists = await usersRepository.get({ email: params.email });
  if (userExists) {
    throw new ApplicationError('Email already registered', httpStatus.CONFLICT);
  }

  return usersRepository.create(params);
};
