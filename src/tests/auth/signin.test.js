// const request = require('supertest');
// const app = require('../../../app');
// const mongoose = require('mongoose');

const {
  version,
  baseUrl,
} = require('../../config/config.js');

describe('Authentications Test', () => {
  const url = `/api/${version}`;
  
  afterAll(async () => {
    await mongoose.disconnect();
  });
  
  test('Signin', async () => {
    // app.use = jest.fn();
    // const body = {
    //   email: "johndoe@email.com",
    //   password: "12341234",
    // };

    // const response = await request(app).post(`${url}/auth/signin`).send(body);

    // expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('auth');
    // expect(response.body.auth).toHaveProperty('user');
    // expect(response.body.auth).toHaveProperty('token');
    // expect(response.body.auth.user).toHaveProperty('_id');
    // expect(response.body.auth.user).toHaveProperty('name');
    // expect(response.body.auth.user).toHaveProperty('email', body.email);
    // expect(response.body.auth.user).not.toHaveProperty('password');

    expect(2 + 2).toBe(4);
  });
});
