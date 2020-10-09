const httpStatus = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError, messages } = require('../../utils');

module.exports.update = async (id, body) => {
  const user = await usersRepository.getById(id);
  if (!user) {
    throw new ApplicationError(messages.notFound('user'), httpStatus.NOT_FOUND);
  }
  Object.assign(user, body);

  return usersRepository.update(user);
};
