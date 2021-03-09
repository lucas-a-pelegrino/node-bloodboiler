const { StatusCodes } = require('http-status-codes');

const { jwt, ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

const { TokenTypes } = require('../../models');
const { tokensRepository } = require('../../repositories');
const tokensService = require('./create.service');

module.exports = {
  refreshTokens: async (token) => {
    const refreshToken = await tokensRepository.get({
      token,
      tokenType: TokenTypes.refresh,
    });

    if (!refreshToken) {
      throw new ApplicationError(messages.notFound('token'), StatusCodes.NOT_FOUND);
    }

    const { sub, expired } = await jwt.verifyToken(refreshToken.token);

    if (expired) {
      Object.assign(refreshToken, { hasExpired: true });
      await tokensRepository.update(refreshToken);

      throw new ApplicationError(messages.expiredToken, StatusCodes.FORBIDDEN);
    }

    await tokensRepository.update(refreshToken);

    return tokensService.create({ id: sub.id });
  },
};
