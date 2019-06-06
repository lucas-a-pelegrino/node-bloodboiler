const request = require('supertest');
const app = require('../../config/express');
const {
  version
} = require('../../config/env/test');

describe('Forgot Password Test', () => {
  const apiVersion = `/api/${version}`;

  it('Should respond with status 200 and email-sent message', async () => {
    const params = { 
      email: "johndoe@email.com",
    };

    const response = await request(app).get(`${apiVersion}/auth/forgot-password/${params.email}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('email-sent', 'i').test(response.body.message));
  });

  it('Should respond with status 404 and user-not-found message', async () => {
    const params = {
      email: 'johndoe123@email.com'
    };

    const response = await request(app).get(`${apiVersion}/auth/forgot-password/${params.email}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('user-not-found', 'i').test(response.body.message));
  });
});
