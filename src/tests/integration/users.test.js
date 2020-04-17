const faker = require('faker');
const request = require('supertest');
const app = require('../../config/express');
const {
  test: { version },
} = require('../../config/env');
const { createSampleUsers, randomMongoId } = require('../fixtures/users.fixtures');

const baseURL = `/api/${version}`;

let sampleUser;
beforeAll(async () => {
  await createSampleUsers();
  sampleUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: 'P@ssw0rd',
  };
});

describe('User Endpoints', () => {
  describe('POST /users', () => {
    test('Should create an user', async () => {
      const response = await request(app)
        .post(`${baseURL}/users`)
        .send(sampleUser);

      sampleUser = response.body;

      expect(response.status).toBe(200);
    });

    test('Should return 409 - Conflict', async () => {
      const response = await request(app)
        .post(`${baseURL}/users`)
        .send(sampleUser);

      expect(response.status).toBe(409);
    });
  });

  describe('GET /users', () => {
    test('Should return a list of users and metadata', async () => {
      const response = await request(app).get(`${baseURL}/users?skip=0&limit=10&currentPage=1`);

      expect(response.status).toBe(200);

      const { metadata, data } = response.body;
      expect(metadata).toBeInstanceOf(Object);
      expect(metadata).toEqual({
        total: 4,
        currentPage: 1,
        totalPages: 1,
      });
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(4);
      expect(data[3]).toEqual(sampleUser);
    });

    test('Should return 204 - No Content', async () => {
      const response = await request(app).get(`${baseURL}/users?skip=10&limit=10&currentPage=1`);

      expect(response.status).toBe(204);
    });
  });

  describe('GET /users/:id', () => {
    test('Should return an user by its id', async () => {
      const response = await request(app).get(`${baseURL}/users/${sampleUser._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(sampleUser);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app).get(`${baseURL}/users/${randomMongoId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /users/:id', () => {
    test('Should update an user', async () => {
      const params = {
        name: 'John Doe',
        email: 'johndoe@ioasys.com.br',
        password: 'P@ssw0rd',
      };

      const response = await request(app)
        .put(`${baseURL}/users/${sampleUser._id}`)
        .send(params);

      expect(response.status).toBe(200);
      expect(response.body.name).toEqual(expect.stringMatching('John Doe'));
    });

    test('Should return 404 - Not Found', async () => {
      const params = {
        name: 'John Doe',
        email: 'johndoe@ioasys.com.br',
        password: 'P@ssw0rd',
      };

      const response = await request(app)
        .put(`${baseURL}/users/${randomMongoId}`)
        .send(params);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    test('Should delete an user', async () => {
      const response = await request(app).delete(`${baseURL}/users/${sampleUser._id}`);

      expect(response.status).toBe(204);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app).delete(`${baseURL}/users/${randomMongoId}`);

      expect(response.status).toBe(404);
    });
  });
});
