const request = require('supertest');
const app = require('../../config/express');
const { version } = require(`../env/${process.env.NODE_ENV}`);

describe('GET /users/:id', () => {
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

  it('Should get user data based on the user id.', async () => {
    const response = await request(app)
                            .get(`${apiVersion}/users/${userId}`)
                            .set('Authorization', headers.token);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).not.toHaveProperty('password');
  });
  
});
