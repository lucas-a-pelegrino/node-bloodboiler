const request = require('supertest');
const app = require('../../config/express');
const {
  version
} = require('../../config/env/test');

describe('PUT /users/:id', () => {
  const apiVersion = `/api/${version}`;
  let token;

  beforeAll(async () => {
    
  });

  it('Should reset user\'s password by Token.', async () => {
    const params = {
      password: '12345',
      passwordConfirmation: '12345',
    };

    const response = request(app)
                      .patch(`${apiVersion}/users/${token}/reset-password`)
                      .send(params);;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(new RegExp('password-succesfully-reseted', 'i').test(response.body.message));
  });
});
