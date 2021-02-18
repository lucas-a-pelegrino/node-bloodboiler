const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const app = require('../../config/express');
const { version } = require('../../config/env');

const { messages } = require('../../helpers');
const { TokenTypes } = require('../../models');

const {
  getSampleToken,
  generateSampleToken,
  fakeToken,
  jwtRegex,
  invalidToken,
} = require('../fixtures/auth.fixtures');

const baseURL = `/api/${version}/auth`;

let sampleAuth;
let sampleToken;
beforeAll(async () => {
  sampleAuth = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: 'P@ssw0rd',
  };
});

describe('Auth Endpoints', () => {
  describe('POST /auth/register', () => {
    test('Should succesfully register an user', async () => {
      const response = await request(app).post(`${baseURL}/register`).send(sampleAuth);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).not.toHaveProperty('password');
      expect(response.body).toMatchObject({
        _id: expect.anything(),
        name: sampleAuth.name,
        email: sampleAuth.email,
      });

      sampleAuth._id = response.body._id;
    });

    test('Should return with 409 - Conflict', async () => {
      const response = await request(app).post(`${baseURL}/register`).send(sampleAuth);

      expect(response.status).toBe(StatusCodes.CONFLICT);
    });
  });

  describe('POST /auth/signin', () => {
    test('Should sign in the user', async () => {
      const response = await request(app)
        .post(`${baseURL}/signin`)
        .send({ email: sampleAuth.email, password: sampleAuth.password });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');

      sampleAuth.accessToken = response.body.accessToken;
      sampleAuth.refreshToken = response.body.refreshToken;
    });

    test('Should return with 404 - Not Found', async () => {
      const response = await request(app)
        .post(`${baseURL}/signin`)
        .send({ email: faker.internet.email(), password: sampleAuth.password });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('Should return with 401 - Unauthorized', async () => {
      const response = await request(app)
        .post(`${baseURL}/signin`)
        .send({ email: sampleAuth.email, password: '12345678' });

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('POST /auth/refresh-token', () => {
    test('Should refresh the access and refresh tokens', async () => {
      const response = await request(app)
        .post(`${baseURL}/refresh-token`)
        .send({ refreshToken: sampleAuth.refreshToken });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body.accessToken).toMatch(jwtRegex);
      expect(response.body.refreshToken).toMatch(jwtRegex);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app).post(`${baseURL}/refresh-token`).send({ refreshToken: fakeToken });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toMatchObject({
        name: 'ApplicationError',
        message: messages.notFound('token'),
      });
    });

    test('Should return 401 - Unauthorized', async () => {
      const response = await request(app)
        .post(`${baseURL}/refresh-token`)
        .send({ refreshToken: invalidToken });

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(new Set(['jwt-malformed', 'invalid-signature'])).toContain(response.body.message);
    });

    test('Should return 403 - Forbidden', async () => {
      const token = await generateSampleToken(sampleAuth._id, TokenTypes.refresh, true);
      const response = await request(app).post(`${baseURL}/refresh-token`).send({ refreshToken: token });

      expect(StatusCodes.FORBIDDEN).toBe(StatusCodes.FORBIDDEN);
      expect(response.body).toMatchObject({
        name: 'ApplicationError',
        message: messages.expiredToken,
      });
    });
  });

  describe('POST /auth/forgot-password', () => {
    beforeEach(() => jest.setTimeout(10000));

    test('Should create an reset token for the user and send it to its email', async () => {
      const response = await request(app)
        .post(`${baseURL}/forgot-password`)
        .send({ email: sampleAuth.email });

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    test('Should return with 404 - Not Found', async () => {
      const response = await request(app)
        .post(`${baseURL}/forgot-password`)
        .send({ email: faker.internet.email() });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('POST /auth/:token/reset-password', () => {
    beforeAll(async () => {
      sampleToken = await getSampleToken(sampleAuth._id, TokenTypes.reset);
    });

    test("Should reset the user's password", async () => {
      const response = await request(app)
        .post(`${baseURL}/${sampleToken.token}/reset-password`)
        .send({ newPassword: 'P@ssW0rd' });

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    test('Should return 403 - Forbidden', async () => {
      const token = await generateSampleToken(sampleAuth._id, TokenTypes.reset, true);
      const response = await request(app)
        .post(`${baseURL}/${token}/reset-password`)
        .send({ newPassword: 'P@ssW0rd' });

      expect(response.status).toBe(StatusCodes.FORBIDDEN);
      expect(response.body).toMatchObject({
        name: 'ApplicationError',
        message: messages.expiredToken,
      });
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app)
        .post(`${baseURL}/${fakeToken}/reset-password`)
        .send({ newPassword: 'P@ssW0rd' });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toMatchObject({
        name: 'ApplicationError',
        message: messages.notFound('token'),
      });
    });
  });
});
