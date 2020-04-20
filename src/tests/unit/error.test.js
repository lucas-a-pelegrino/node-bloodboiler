const httpMocks = require('node-mocks-http');
const { errorTracker } = require('../../middlewares');
const { ApplicationError, logger } = require('../../utils');

describe('Error Middlewares', () => {
  describe('Error Tracker', () => {
    test('Should return ApplicationError with 400 - Bad Request', () => {
      const error = new ApplicationError('Bad Request', 400);
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      errorTracker(error, req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('Should parse an Error to ApplicationError, keeping status and message', () => {
      const error = new Error('Some Random Error');
      error.statusCode = 400;
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      errorTracker(error, req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApplicationError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: error.statusCode,
          message: error.message,
          isOperational: false,
        }),
      );
    });

    test('Should parse an Error without message and status to ApplicationError with 500 - Internal Server Error', () => {
      const error = new Error();
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      errorTracker(error, req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApplicationError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 500,
          message: 'Internal Server Error',
          isOperational: false,
        }),
      );
    });
  });
});
