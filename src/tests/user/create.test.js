const request = require('supertest');
const app = require('../../config/express');
const { version } = require(`../env/${process.env.NODE_ENV}`);

describe('POST /users', () => {
  const apiVersion = `/api/${version}`;
  let headers;

  beforeAll(async () => {
    jest.setTimeout(5000);
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

  const params = {
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    password: '123123test'
  };

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

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('errors');
    expect(new RegExp('email-already-in-use', 'i').test(response.body.errors[0]));
  });
});
