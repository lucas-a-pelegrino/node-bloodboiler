const { StatusCodes } = require('http-status-codes');
const { jwt, ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');
const { tokensRepository } = require('../../repositories');
const tokensService = require('./create.service');

module.exports = {
  refreshTokens: async (refreshToken) => {
    const decoded = await jwt.verifyToken(refreshToken);

    if (decoded.expired) {
      const expiredToken = await tokensRepository.get({ token: refreshToken });

      Object.assign(expiredToken, {
        hasExpired: true,
      });

      await tokensRepository.update(expiredToken);

      throw new ApplicationError(messages.expiredToken, StatusCodes.FORBIDDEN);
    }

    const token = await tokensRepository.get({
      token: refreshToken,
      userId: decoded.sub.id,
      hasExpired: false,
    });

    if (!token) {
      throw new ApplicationError(messages.notFound('token'), StatusCodes.NOT_FOUND);
    }

    Object.assign(token, {
      hasExpired: true,
    });

    await tokensRepository.update(token);

    const payload = { id: decoded.sub.id };

    return tokensService.create(payload);
  },
};
