const moment = require('moment');

const { jwt } = require('../../utils');
const { tokensRepository } = require('../../repositories');

const jwtRegex = new RegExp(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);

const getSampleToken = async (userId, tokenType) => tokensRepository.get({ userId, tokenType });
const saveSampleToken = (token) => tokensRepository.create(token);

const accessToken = (userId) => {
  return jwt.signToken(
    {
      sub: { id: userId },
      iat: moment().unix(),
    },
    {
      algorithm: 'HS384',
      expiresIn: '5m',
    },
  );
};

const generateSampleToken = async (userId, tokenType, expired = false, persist = true) => {
  const token = jwt.signToken(
    {
      sub: { id: userId },
      iat: moment().unix(),
    },
    {
      algorithm: 'HS384',
      expiresIn: expired ? '-30m' : '5m',
    },
  );

  if (persist) {
    await saveSampleToken({
      token,
      userId,
      tokenType,
      hasExpired: expired,
    });
  }

  return token;
};

module.exports = {
  getSampleToken,
  generateSampleToken,
  accessToken,
  jwtRegex,
};
