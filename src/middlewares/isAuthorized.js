const { StatusCodes } = require('http-status-codes');
const { jwt, catchAsync, ApplicationError } = require('../utils');
const { messages } = require('../helpers');
const { usersRepository } = require('../repositories');

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

  let userId;
  jwt.verify(token, (err, decoded) => {
    if (err) {
      throw new ApplicationError(err.message, StatusCodes.UNAUTHORIZED);
    }

    userId = decoded.sub.id;
  });

  const decodedUser = await usersRepository.getById(userId);

  if (!decodedUser) {
    throw new ApplicationError(messages.notFound('user'), StatusCodes.NOT_FOUND);
  }

  req.session = { token, _id: decodedUser._id, email: decodedUser.email };

  next();
});
