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

  const decodedUser = await usersService.get(userId);

  const userAccessToken = decodedUser.tokens.find((AccessToken) => AccessToken.access === token);

  if (!userAccessToken) {
    throw new ApplicationError(messages.notFound('token'), StatusCodes.NOT_FOUND);
  }

  if (userAccessToken.expired) {
    throw new ApplicationError(messages.expiredToken, StatusCodes.FORBIDDEN);
  }

  req.session = { token, _id: decodedUser._id, email: decodedUser.email };

  next();
});
