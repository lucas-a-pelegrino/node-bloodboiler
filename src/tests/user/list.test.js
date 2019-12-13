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

  it('Should list users with conditions filters applied.', async () => {
    const response = await request(app)
                            .get(`${apiVersion}/users?skip=0&limit=10&conditions[name]=john`)
                            .set('Authorization', headers.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('count');
  });

  it('Should list users with projections filters applied.', async () => {
    const response = await request(app)
                            .get(`${apiVersion}/users?skip=0&limit=10&projection[0]=name&projection[1]=email`)
                            .set('Authorization', headers.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('count');
  });

  it('Should list users with projections filters applied.', async () => {
    const response = await request(app)
                            .get(`${apiVersion}/users?skip=0&limit=10&sort[email]=-1`)
                            .set('Authorization', headers.token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('count');
  });
});
