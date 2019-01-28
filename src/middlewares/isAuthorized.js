const { promisify } = require('util');
const jwt = require('../utils/jwt');
const { getUserById } = require('../services/user');

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
          return res.status(401).json({ errors: ['wrong-authorization-format'] });
        }
      }
    } else {
      return res.status(401).json({ errors: ['wrong-authorization-format'] });
    }
    const decoded = await verify(token);
    const user = await getUserById(decoded.user.id);

    if (!user) {
      return res.status(401).json({ errors: ['user-not-found'] });
    }

    req.session = {
      token,
      user,
    };

    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};
