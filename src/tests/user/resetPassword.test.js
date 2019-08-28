const request = require('supertest');
const faker = require('faker');
const app = require('../../config/express');
const {
  version
} = require('../../config/env/test');
const {
  createUser,
  getUserById,
} = require('../../services/user');
const {
  resetPassword,
} = require('../../services/auth');


describe('Password Reset Test', () => {
  const apiVersion = `/api/${version}`;
  const params = {
    password: '12341234',
    passwordConfirmation: '12341234',
  };
  let user = {};
  let passwordResetToken = '';

  beforeAll(async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "12341234",
    };

    try {
      user = await createUser(body);
      await resetPassword(user.email);
      user = await getUserById(user.id);
      passwordResetToken = user.passwordResetToken;
    } catch (error) {
      throw error;
    }
  });

  it('Should respond with status 403 and passwords-dont-match message', async () => {
    const params = {
      password: '1234',
      passwordConfirmation: '12345',
    };

    const response = await request(app)
      .patch(`${apiVersion}/users/${passwordResetToken}/reset-password`)
      .send(params);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('passwords-dont-match', 'i').test(response.body.message)).toBe(true);
  });

  it('Should respond with status 404 and user-not-found', async () => {
    
    const response = await request(app)
      .patch(`${apiVersion}/users/${Math.random().toString(36).substring(2, 15)}/reset-password`)
      .send(params);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('user-not-found', 'i').test(response.body.message)).toBe(true);
  });

  it('Should reset user\'s password by Token.', async () => {
    const response = await request(app)
      .patch(`${apiVersion}/users/${passwordResetToken}/reset-password`)
      .send(params);;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('password-succesfully-reseted', 'i').test(response.body.message)).toBe(true);
  });

});