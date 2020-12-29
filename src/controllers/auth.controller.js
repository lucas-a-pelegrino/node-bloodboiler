const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { authService, accessTokensService } = require('../services');

module.exports = {
  signin: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.signin(email, password);
    return res.status(StatusCodes.OK).json(response);
  }),

  refreshToken: catchAsync(async (req, res) => {
    const { refreshToken } = req.body;
    const response = await accessTokensService.refreshTokens(refreshToken);
    return res.status(StatusCodes.OK).json(response);
  }),

  forgotPassword: catchAsync(async (req, res) => {
    const { email } = req.body;
    await authService.forgotPassword(email);
    return res.status(StatusCodes.NO_CONTENT).end();
  }),

  resetPassword: catchAsync(async (req, res) => {
    const {
      params: { token },
      body: { newPassword },
    } = req;
    await authService.resetPassword(token, newPassword);
    return res.status(StatusCodes.NO_CONTENT).end();
  }),
};
