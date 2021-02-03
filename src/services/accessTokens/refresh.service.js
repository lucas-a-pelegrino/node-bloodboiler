const { StatusCodes } = require('http-status-codes');
const { jwt, ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');
const usersService = require('../users');
const accessTokensService = require('./create.service');

module.exports = {
  refreshTokens: async (refreshToken) => {
    const {
      sub: { userId },
    } = await jwt.verifyToken(refreshToken);

    const user = await usersService.get(userId);
    const userRefreshToken = user.tokens.find((token) => token.refresh === refreshToken);

    if (!userRefreshToken) {
      throw new ApplicationError(messages.notFound('token'), StatusCodes.NOT_FOUND);
    }

    if (userRefreshToken.expired) {
      throw new ApplicationError(messages.expiredToken, StatusCodes.FORBIDDEN);
    }

    const payload = {
      sub: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    await usersService.update(user._id, user);

    return accessTokensService.create(payload);
  },
};
