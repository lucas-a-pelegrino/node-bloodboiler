const { signin } = require('./signin.service');
const { forgotPassword } = require('./forgotPassword.service');
const { resetPassword } = require('./resetPassword.service');

module.exports = {
  signin,
  forgotPassword,
  resetPassword,
};
