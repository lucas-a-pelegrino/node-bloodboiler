const { promisify } = require('util');
const jwt = require('../utils/jwt');
const { getUserById } = require('../services/user');
const ErrorHandler = require('../lib/errors');

const verify = promisify(jwt.verify);

module.exports = async (req, res, next) => {
  let token;
  try {
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');

      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        } else {
          throw new ErrorHandler.AuthorizationError('wrong-authorization-format');
        }
      }
    } else {
      throw new ErrorHandler.AuthorizationError('wrong-authorization-format');
    }
    const decoded = await verify(token);
    const user = await getUserById(decoded.user.id);

    if (!user) {
      throw new ErrorHandler.ApplicationError('user-not-found', 404);
    }

    req.session = {
      token,
      user,
    };

    next();
  } catch (error) {
    res.status(error.status).json({
      name: error.name,
      message: error.message,
    });
  }
};
