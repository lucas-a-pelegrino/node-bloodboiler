const { StatusCodes } = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports.getBy = async (props) => {
  const user = await usersRepository.get(props);
  if (!user) {
    throw new ApplicationError(messages.notFound('user'), StatusCodes.NOT_FOUND);
  }

  return user;
};
