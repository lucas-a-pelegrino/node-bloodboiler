const { StatusCodes } = require('http-status-codes');
const { jwt, catchAsync, ApplicationError } = require('../utils');
const { messages } = require('../helpers');
const usersService = require('../services/users');

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    const [scheme, credentials] = req.headers.authorization.split(' ');

    if (scheme.match(/^Bearer$/i)) {
      token = credentials;
    } else {
      throw new ApplicationError(messages.invalidAuthFormat, StatusCodes.UNAUTHORIZED);
    }
  } else {
    throw new ApplicationError(messages.authMissing, StatusCodes.UNAUTHORIZED);
  }

  const {
    sub: { id: userId },
  } = await jwt.verifyToken(token);

  const user = await usersService.get(userId);

  req.session = { token, _id: user._id, email: user.email };

  next();
});
