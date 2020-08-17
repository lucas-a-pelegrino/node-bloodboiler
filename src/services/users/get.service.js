const httpStatus = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');

module.exports.get = async (id) => {
  const user = await usersRepository.getById(id);
  if (!user) {
    throw new ApplicationError('User not found', httpStatus.NOT_FOUND);
  }

  return user;
};
