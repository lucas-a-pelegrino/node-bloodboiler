const { promisify } = require('util');
const { jwt, catchAsync, ApplicationError } = require('../utils');
const { usersRepository } = require('../repositories');

const verify = promisify(jwt.verify);

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    const [scheme, credentials] = req.headers.authorization.split(' ');

    if (scheme.match(/^Bearer$/i)) {
      token = credentials;
    } else {
      throw new ApplicationError('Invalid Authorization Format', 403);
    }
  } else {
    throw new ApplicationError('Missing Authorization', 403);
  }

  const decoded = await verify(token);
  const decodedUser = await usersRepository.getById(decoded.user.id);

  if (!decodedUser) {
    throw new ApplicationError('User Not Found', 404);
  }

  req.session = { token, _id: decodedUser._id, email: decodedUser.email };

  next();
});
