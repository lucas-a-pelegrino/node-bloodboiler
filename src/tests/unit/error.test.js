const httpMocks = require('node-mocks-http');
const { errorTracker, errorHandler } = require('../../middlewares');
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

  describe('Error Handler', () => {
    beforeEach(() => jest.spyOn(logger, 'error').mockImplementation(() => {}));

    test('Should build error response and set message on res.locals', () => {
      const error = new ApplicationError('Bad Request', 400);
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const spy = jest.spyOn(res, 'json');

      errorHandler(error, req, res);

      expect(res.statusCode).toBe(400);
      expect(res.locals.errorMessage).toBe(error.message);
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({ message: error.message }));
    });

    test('Should have error stack on response body if env === development', () => {
      process.env.NODE_ENV = 'development';
      const error = new ApplicationError('Bad Request', 400);
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const spy = jest.spyOn(res, 'json');

      errorHandler(error, req, res);

      expect(res.statusCode).toBe(400);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ message: error.message, stack: error.stack }),
      );
      process.env.NODE_ENV = 'test';
    });

    test("Should keep error status code and message if env === production and it's an operational error", () => {
      process.env.NODE_ENV = 'production';
      const error = new ApplicationError('Bad Request', 400);
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const spy = jest.spyOn(res, 'json');

      errorHandler(error, req, res);

      expect(res.statusCode).toBe(400);
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({ message: error.message }));
      process.env.NODE_ENV = 'test';
    });

    test("Should send 500 - Internal Server Error if env === production and it's not an operational error", () => {
      process.env.NODE_ENV = 'production';
      const error = new ApplicationError('Bad Request', 400, false);
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const spy = jest.spyOn(res, 'json');

      errorHandler(error, req, res);

      expect(res.statusCode).toBe(500);
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({ message: 'Internal Server Error' }));
      process.env.NODE_ENV = 'test';
    });
  });
});
