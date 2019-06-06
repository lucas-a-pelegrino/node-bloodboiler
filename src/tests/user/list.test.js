const request = require('supertest');
const app = require('../../config/express');
const { version } = require('../../config/env/test');

describe('GET /users', () => {
  const apiVersion = `/api/${version}`;
  let headers;

  beforeAll(async () => {
    const body = {
      email: "johndoe@email.com",
      password: "12341234",
    };

    const response = await request(app).post(`${apiVersion}/auth/signin`).send(body);
    const token = `Bearer ${response.body.auth.token}`;
    headers = {
      token,
    };
  });

  it('Should list users.', async () => {
    const response = await request(app)
                            .get(`${apiVersion}/users`)
                            .set('Authorization', headers.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('count');
  });
});
