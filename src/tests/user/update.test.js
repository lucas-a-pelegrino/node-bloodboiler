const request = require('supertest');
const app = require('../../config/express');
const {
  version,
} = require('../../config/config.js');

describe('PUT /users/:id', () => {
  const apiVersion = `/api/${version}`;
  let userId;
  let headers;

  beforeAll(async () => {
    jest.setTimeout(5000);
    const body = {
      email: "johndoe@email.com",
      password: "12341234",
    };

    const response = await request(app).post(`${apiVersion}/auth/signin`).send(body);
    const token = `Bearer ${response.body.auth.token}`;
    userId = response.body.auth.user._id;
    headers = {
      token,
    };
  });

  it('Should update an user by ID.', async () => {
    const params = {
      name: 'John Von Doe',
    };

    const response = await request(app)
                            .put(`${apiVersion}/users/${userId}`)
                            .set('Authorization', headers.token)
                            .send(params);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(new RegExp(params.name, 'i').test(response.body.name)).toBe(true);
  });
});
