const moment = require('moment');

const { accessTokenExpiresIn, refreshTokenExpiresIn } = require('../../config/env');
const { encryptor } = require('../../helpers');
const { usersRepository } = require('../../repositories');

module.exports = {
  create: async (payload) => {
    const accessToken = encryptor.generateToken(
      {
        ...payload,
        iat: moment().unix(),
      },
      {
        algorithm: 'HS384',
        expiresIn: accessTokenExpiresIn,
      },
    );

    const refreshToken = encryptor.generateToken(
      {
        sub: {
          id: payload.sub.id,
        },
        iat: moment().unix(),
      },
      {
        algorithm: 'HS256',
        expiresIn: refreshTokenExpiresIn,
      },
    );

    const user = await usersRepository.getById(payload.sub.id);
    user.tokens.push({ access: accessToken, refresh: refreshToken });

    await usersRepository.update(user);

    return {
      accessToken,
      refreshToken,
    };
  },
};
