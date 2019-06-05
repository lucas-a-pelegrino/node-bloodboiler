const request = require('supertest');
const app = require('../../config/express');
const { version } = require('../../config/env/test');

describe('Authentication Test', () => {
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

  describe('Password Reset Test', () => {
    const apiVersion = `/api/${version}`;
    const params = {
      password: '12341234',
      passwordConfirmation: '12341234',
    };
    let resetPasswordToken;

    beforeAll(async () => {
      const body = {
        email: "johndoe@email.com",
        password: "12341234",
      };

      const signInResponse = await request(app).post(`${apiVersion}/auth/signin`).send(body);
      const token = `Bearer ${signInResponse.body.auth.token}`;
      headers = {
        token,
      };

      const getResponse = await request(app)
        .get(`${apiVersion}/users?skip=0&limit=10$conditions[name]=${signInResponse.body.auth.user.name}`)
        .set('Authorization', headers.token);

      resetPasswordToken = getResponse.body.data[0].passwordResetToken;
    });

    it('Should reset user\'s password by Token.', async () => {
      const response = await request(app)
        .patch(`${apiVersion}/users/${resetPasswordToken}/reset-password`)
        .send(params);;

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(new RegExp('password-succesfully-reseted', 'i').test(response.body.message));
    });

    it('Should respond with status 404 and user-not-found', async () => {
      const response = await request(app)
        .patch(`${apiVersion}/users/${resetPasswordToken}/reset-password`)
        .send(params);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(new RegExp('user-not-found', 'i').test(response.body.message));
    });
  });
});
