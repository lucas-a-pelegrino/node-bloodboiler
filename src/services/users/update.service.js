const httpStatus = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');

module.exports.update = async (id, body) => {
  const user = await usersRepository.getById(id);
  if (!user) {
    throw new ApplicationError('User not found', httpStatus.NOT_FOUND);
  }
  Object.assign(user, body);

  return usersRepository.update(user);
};
