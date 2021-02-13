const moment = require('moment');

const { usersService } = require('../../services');
const { jwt } = require('../../utils');
const { tokensRepository } = require('../../repositories');
const { TokenTypes } = require('../../models');

const fakeRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI1ZjIzOTY5YTYzNzE5ZDI2ZjQ3YTlmZjcifSwiaWF0IjoxNjEzMDc5NzkwLCJleHAiOjE2MTM2ODQ1OTB9.BpcUzyImFNSlA-mc952LfYnBekjU3SQ45gh9qForHAk';

const invalidToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI1ZjIzOTY5YTYzNzE5ZDI2ZjQ3YTlmZjcifSwiaWF0IjoxNjEzMDc5NzkwLCJleHAiOjE2MTM2ODQ1OTB9.Iq95MwApkECp5gpZH1mwAutTQN-omnJCh9YVD';

const jwtRegex = new RegExp(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);

const getSampleUser = async (id) => usersService.get(id);

const saveSampleToken = (token) => tokensRepository.create(token);

const generateExpiredToken = async (id) => {
  const token = jwt.signToken(
    {
      sub: { id },
      iat: moment().unix(),
    },
    {
      algorithm: 'HS384',
      expiresIn: '0s',
    },
  );

  await saveSampleToken({
    token,
    userId: id,
    tokenType: TokenTypes.refresh,
  });

  return token;
};

const generateSampleToken = async (id) => {
  return jwt.signToken(
    {
      sub: { id },
      iat: moment().unix(),
    },
    {
      algorithm: 'HS256',
      expiresIn: '5min',
    },
  );
};

module.exports = {
  getSampleUser,
  generateExpiredToken,
  generateSampleToken,
  fakeRefreshToken,
  jwtRegex,
  invalidToken,
};
