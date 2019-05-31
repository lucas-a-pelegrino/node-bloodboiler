const request = require('supertest');
const app = require('../../config/express');
const { version } = require('../../config/env/test');

describe('Authentication Test', () => {
  const apiVersion = `/api/${version}`;

  it('Should respond with 200', async () => {
    const params = { 
      email: "johndoe@email.com",
    };

    const response = await request(app).get(`${apiVersion}/auth/forgot-password/${params.email}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('email-sent');
  });
});