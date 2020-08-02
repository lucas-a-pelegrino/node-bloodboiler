const httpStatus = require('http-status-codes');
const { jwt, catchAsync, ApplicationError } = require('../utils');
const { usersRepository } = require('../repositories');

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    const [scheme, credentials] = req.headers.authorization.split(' ');

    if (scheme.match(/^Bearer$/i)) {
      token = credentials;
    } else {
      throw new ApplicationError('Invalid Authorization Format', httpStatus.UNAUTHORIZED);
    }
  } else {
    throw new ApplicationError('Missing Authorization', httpStatus.UNAUTHORIZED);
  }

  let userId;
  jwt.verify(token, (err, decoded) => {
    if (err) {
      throw new ApplicationError(err.message, httpStatus.UNAUTHORIZED);
    }

    userId = decoded.sub.id;
  });

  const decodedUser = await usersRepository.getById(userId);

  if (!decodedUser) {
    throw new ApplicationError('User Not Found', httpStatus.NOT_FOUND);
  }

  req.session = { token, _id: decodedUser._id, email: decodedUser.email };

  next();
});
