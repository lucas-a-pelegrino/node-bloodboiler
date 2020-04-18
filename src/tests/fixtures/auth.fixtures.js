const moment = require('moment');

const {
  test: { resetTokenExpiresTime, resetTokenExpiresTimeFormat },
} = require('../../config/env');

const { usersService } = require('../../services');
const { jwt } = require('../../utils');

const getSampleUser = async (id) => usersService.get(id);

const generateExpiredToken = async (id) => {
  const payload = {
    sub: id,
    exp: moment()
      .subtract(resetTokenExpiresTime, resetTokenExpiresTimeFormat)
      .unix(),
  };

  const token = await jwt.issue(payload);
  await usersService.update(id, { passwordResetToken: token });

  return token;
};

const generateSampleToken = async (id) => {
  const payload = {
    sub: { id },
    iat: moment().unix(),
  };

  return jwt.issue(payload);
};

module.exports = {
  getSampleUser,
  generateExpiredToken,
  generateSampleToken,
};
