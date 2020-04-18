const { jwt, catchAsync, ApplicationError } = require('../utils');
const { usersRepository } = require('../repositories');

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    const [scheme, credentials] = req.headers.authorization.split(' ');

    if (scheme.match(/^Bearer$/i)) {
      token = credentials;
    } else {
      throw new ApplicationError('Invalid Authorization Format', 401);
    }
  } else {
    throw new ApplicationError('Missing Authorization', 401);
  }

  let userId;
  jwt.verify(token, (err, decoded) => {
    if (err) {
      throw new ApplicationError(err.message, 401);
    }

    userId = decoded.sub.id;
  });

  const decodedUser = await usersRepository.getById(userId);

  if (!decodedUser) {
    throw new ApplicationError('User Not Found', 404);
  }

  req.session = { token, _id: decodedUser._id, email: decodedUser.email };

  next();
});
