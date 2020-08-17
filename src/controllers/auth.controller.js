const httpStatus = require('http-status-codes');
const { catchAsync } = require('../utils');
const { authService } = require('../services');

module.exports = {
  signin: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.signin(email, password);
    return res.status(httpStatus.OK).json(response);
  }),

  forgotPassword: catchAsync(async (req, res) => {
    const { email } = req.body;
    await authService.forgotPassword(email);
    return res.status(httpStatus.NO_CONTENT).end();
  }),

  resetPassword: catchAsync(async (req, res) => {
    const {
      params: { token },
      body: { newPassword },
    } = req;
    await authService.resetPassword(token, newPassword);
    return res.status(httpStatus.NO_CONTENT).end();
  }),
};
