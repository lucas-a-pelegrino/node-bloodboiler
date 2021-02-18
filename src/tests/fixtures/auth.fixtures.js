const moment = require('moment');

const { jwt } = require('../../utils');
const { tokensRepository } = require('../../repositories');

const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI1ZjIzOTY5YTYzNzE5ZDI2ZjQ3YTlmZjcifSwiaWF0IjoxNjEzMDc5NzkwLCJleHAiOjE2MTM2ODQ1OTB9.BpcUzyImFNSlA-mc952LfYnBekjU3SQ45gh9qForHAk';

const invalidToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI1ZjIzOTY5YTYzNzE5ZDI2ZjQ3YTlmZjcifSwiaWF0IjoxNjEzMDc5NzkwLCJleHAiOjE2MTM2ODQ1OTB9.Iq95MwApkECp5gpZH1mwAutTQN-omnJCh9YVD';

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

const generateSampleToken = async (userId, tokenType, expired = false) => {
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

  await saveSampleToken({
    token,
    userId,
    tokenType,
    hasExpired: expired,
  });

  return token;
};

module.exports = {
  getSampleToken,
  generateSampleToken,
  accessToken,
  fakeToken,
  jwtRegex,
  invalidToken,
};
