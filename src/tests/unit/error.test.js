const httpMocks = require('node-mocks-http');
const { errorTracker } = require('../../middlewares');
const { ApplicationError } = require('../../utils');

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

    test('Should parse an Error to ApplicationError, keeping code and message', () => {
      const error = new Error('Some Random Error');
      error.status = 400;
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      errorTracker(error, req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApplicationError));
    });

    test('Should parse an Error without message and status to ApplicationError with 500 - Internal Server Error', () => {
      const error = new Error();
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      errorTracker(error, req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApplicationError));
    });
  });
});
