const request = require('supertest');
const faker = require('faker');
const app = require('../../config/express');
const {
  version
} = require('../../config/env/test');
const {
  createUser,
} = require('../../services/user');

describe('DELETE /users/:id', () => {
  const apiVersion = `/api/${version}`;
  let user = {};
  let headers = {};

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

  beforeAll(async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    try {
      user = await createUser(body);
    } catch (error) {
      throw error;
    }
  });

  it('Should delete an user by ID.', async () => {
    const response = await request(app)
      .delete(`${apiVersion}/users/${user.id}`)
      .set('Authorization', headers.token);

    expect(response.status).toBe(200);
    expect(new RegExp('user-successfully-deleted', 'i').test(response.body.message)).toBe(true);
  });
});
