const moment = require('moment');

const { accessTokenExpiresIn, refreshTokenExpiresIn } = require('../../config/env');
const { encryptor } = require('../../helpers');
const { tokensRepository } = require('../../repositories');
const { TokenTypes } = require('../../models');

module.exports = {
  create: async (payload) => {
    let accessToken = encryptor.generateToken(
      {
        sub: { ...payload },
        iat: moment().unix(),
      },
      {
        algorithm: 'HS384',
        expiresIn: accessTokenExpiresIn,
      },
    );

    let refreshToken = encryptor.generateToken(
      {
        sub: { ...payload },
        iat: moment().unix(),
      },
      {
        algorithm: 'HS256',
        expiresIn: refreshTokenExpiresIn,
      },
    );

    accessToken = await tokensRepository.create({
      token: accessToken,
      userId: payload.id,
      tokenType: TokenTypes.access,
    });

    refreshToken = await tokensRepository.create({
      token: refreshToken,
      userId: payload.id,
      tokenType: TokenTypes.refresh,
    });

    return {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
    };
  },
};
