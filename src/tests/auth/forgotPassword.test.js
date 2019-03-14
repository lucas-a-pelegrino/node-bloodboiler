const request = require('supertest');
const app = require('../../config/express');
const {
  version,
} = require('../../config/config.js');
const mongoose = require('mongoose');

describe('Authentication Test', () => {
  const apiVersion = `/api/${version}`;

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Should respond with 200', async () => {
    const params = { 
      email: "lucas.assuncao.p@gmail.com"
    };

    const response = await request(app).get(`${apiVersion}/auth/forgot-password/${params.email}`);

    expect(response.status).toBe(200);
  });
});
