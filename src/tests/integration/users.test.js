const faker = require('faker');
const request = require('supertest');
const app = require('../../config/express');
const {
  test: { version },
} = require('../../config/env');
const { createSampleUsers, createSampleUser, randomMongoId } = require('../fixtures/users.fixtures');
const { generateSampleToken } = require('../fixtures/auth.fixtures');

const baseURL = `/api/${version}/users`;

let sampleUser;
let token;
beforeAll(async () => {
  await createSampleUsers();
  const auth = await createSampleUser();
  token = await generateSampleToken(auth._id);
});

describe('User Endpoints', () => {
  describe('POST /users', () => {
    test('Should create an user', async () => {
      sampleUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'P@ssw0rd',
      };

      const response = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      sampleUser = response.body;

      expect(response.status).toBe(200);
    });

    test('Should return 409 - Conflict', async () => {
      const response = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      expect(response.status).toBe(409);
    });
  });

  describe('GET /users', () => {
    test('Should return a list of users and metadata', async () => {
      const page = 1;
      const perPage = 10;
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);

      const { body } = response;
      expect(body).toMatchObject({
        metadata: expect.any(Object),
        data: expect.any(Array),
      });
    });

    test('Should return 204 - No Content', async () => {
      const page = 2;
      const perPage = 10;
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });

  describe('GET /users/:id', () => {
    test('Should return an user by its id', async () => {
      const response = await request(app)
        .get(`${baseURL}/${sampleUser._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(sampleUser);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app)
        .get(`${baseURL}/${randomMongoId}`)
        .set('Authorization', `Bearer ${token}`);

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
        .put(`${baseURL}/${sampleUser._id}`)
        .set('Authorization', `Bearer ${token}`)
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
        .put(`${baseURL}/${randomMongoId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(params);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    test('Should delete an user', async () => {
      const response = await request(app)
        .delete(`${baseURL}/${sampleUser._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    test('Should return 404 - Not Found', async () => {
      const response = await request(app)
        .delete(`${baseURL}/${randomMongoId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});
