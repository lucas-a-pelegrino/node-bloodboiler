const moment = require('moment');

const { accessTokenExpiresIn, refreshTokenExpiresIn } = require('../../config/env');
const { encryptor } = require('../../helpers');
const { tokensRepository } = require('../../repositories');
const { TokenTypes } = require('../../models');

module.exports = {
  create: async (payload) => {
    const accessToken = encryptor.generateToken(
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

    refreshToken = await tokensRepository.create({
      token: refreshToken,
      userId: payload.id,
      tokenType: TokenTypes.refresh,
    });

    return {
      accessToken,
      refreshToken: refreshToken.token,
    };
  },
};
