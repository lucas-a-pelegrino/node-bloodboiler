const request = require('supertest');
const faker = require('faker');
const app = require('../../config/express');
const { version } = require('../../config/env/test');

describe('POST /users', () => {
  const apiVersion = `/api/${version}`;
  const params = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
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

  it('Should create an user', async () => {

    const response = await request(app)
                            .post(`${apiVersion}/users`)
                            .set('Authorization', headers.token)
                            .send(params);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).not.toHaveProperty('password');
  });

  it('Should respond with error message: email-already-in-use.', async () => {
    const response = await request(app)
                            .post(`${apiVersion}/users`)
                            .set('Authorization', headers.token)
                            .send(params);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('email-already-in-use', 'i').test(response.body.message));
  });
});
