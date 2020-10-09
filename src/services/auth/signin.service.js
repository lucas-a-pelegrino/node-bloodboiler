const moment = require('moment');
const httpStatus = require('http-status-codes');
const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { encryptor, messages } = require('../../helpers');

module.exports.signin = async (email, password) => {
  const user = await usersRepository.get({ email });
  if (!user) {
    throw new ApplicationError(messages.notFound('user'), httpStatus.NOT_FOUND);
  }

  const isPasswordValid = await encryptor.comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApplicationError(messages.invalidPassword, httpStatus.UNAUTHORIZED);
  }

  const payload = {
    sub: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    iat: moment().unix(),
  };

  const token = await encryptor.generateToken(payload);

  return { token };
};
