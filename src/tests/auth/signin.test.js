const request = require('supertest');
const app = require('../../config/express');
const { version } = require('../../config/env/test');

describe('Authentication Test', () => {
  const apiVersion = `/api/${version}`;
  
  it('Should sign in the user via email/password', async () => {
    const body = {
      email: "johndoe@email.com",
      password: "12341234",
    };

    const response = await request(app).post(`${apiVersion}/auth/signin`).send(body);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('auth');
    expect(response.body.auth).toHaveProperty('user');
    expect(response.body.auth).toHaveProperty('token');
    expect(response.body.auth.user).toHaveProperty('_id');
    expect(response.body.auth.user).toHaveProperty('name');
    expect(response.body.auth.user).toHaveProperty('email', body.email);
    expect(response.body.auth.user).not.toHaveProperty('password');
  });

  it('Should sign in the user with metadata included', async () => {
    const body = {
      email: "johndoe@email.com",
      password: "12341234",
      meta: {
        token: "AHDIUQQE90D0X-AXEFDASFDSC-AFSDCWER1W1R324242ACDAG",
        os: "ios"
      }
    };

    const response = await request(app).post(`${apiVersion}/auth/signin`).send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('auth');
    expect(response.body.auth).toHaveProperty('user');
    expect(response.body.auth).toHaveProperty('token');
    expect(response.body.auth.user).toHaveProperty('_id');
    expect(response.body.auth.user).toHaveProperty('name');
    expect(response.body.auth.user).toHaveProperty('email', body.email);
    expect(response.body.auth.user).not.toHaveProperty('password');
  });

  it('Should fail with status 403 and missing email/password', async () => {
    const body = {};

    const response = await request(app)
                            .post(`${apiVersion}/auth/signin`)
                            .send(body);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('missing-email-or-password', 'i').test(response.body.message)).toBe(true);
  });

  it('Should fail with status 404 and user not found', async () => {
    const body = {
      email: "johndoe13@email.com",
      password: "12341234",
    };

    const response = await request(app)
      .post(`${apiVersion}/auth/signin`)
      .send(body);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('user-not-found', 'i').test(response.body.message)).toBe(true);
  });
  
  it('Should fail with status 401 and incorrect password', async () => {
    const body = {
      email: "johndoe@email.com",
      password: "43214321",
    };

    const response = await request(app)
      .post(`${apiVersion}/auth/signin`)
      .send(body);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('password-invalid', 'i').test(response.body.message)).toBe(true);
  });

});
