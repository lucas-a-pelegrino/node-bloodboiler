const faker = require('faker');
const request = require('supertest');
const app = require('../../config/express');
const { version } = require('../../config/env');
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
      const params = {
        name: faker.name.findName(),
        email: sampleUser.email,
        password: 'P@ssw0rd',
      };

      const response = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(params);

      expect(response.status).toBe(409);
    });
  });

  describe('GET /users', () => {
    test('Should return a list of users and metadata', async () => {
      const page = 1;
      const perPage = 10;
      const sortBy = 'createdAt:asc';
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);

      const { body } = response;
      expect(body).toMatchObject({
        metadata: expect.any(Object),
        data: expect.any(Array),
      });
    });

    test('Should return a list of users and metadata (without query params)', async () => {
      const response = await request(app)
        .get(`${baseURL}`)
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

    test('Should return 400 - Bad Request if sortBy has invalid input', async () => {
      const page = 1;
      const perPage = 10;
      const sortBy = 'createdAtdesc';
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}&sortBy=${sortBy}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Invalid Fields',
          errors: {
            query: {
              sortBy: "sorting order must be one of the following: 'asc' or 'desc'",
            },
          },
        }),
      );
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

    test('Should return 400 - Bad Request', async () => {
      const response = await request(app)
        .get(`${baseURL}/1`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Invalid Fields',
          errors: {
            params: {
              id: 'id must be a valid mongo id',
            },
          },
        }),
      );
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

  describe('Authorization', () => {
    test('Should return 401 - Unauthorized if Authorization header is missing', async () => {
      const page = 2;
      const perPage = 10;
      const response = await request(app).get(`${baseURL}?page=${page}&perPage=${perPage}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('Missing Authorization');
    });

    test('Should return 401 - Unauthorized if Authorization format is invalid', async () => {
      const page = 2;
      const perPage = 10;
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}`)
        .set('Authorization', `Beaver ${token}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('Invalid Authorization Format');
    });

    test('Should return 401 - Unauthorized if JWT token is invalid', async () => {
      const page = 2;
      const perPage = 10;
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}`)
        .set('Authorization', `Bearer some.invalid.jwt`);

      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('invalid token');
    });

    test("Should return 404 - Not Found if provided token doesn't match to any existing user", async () => {
      const page = 2;
      const perPage = 10;
      const token = await generateSampleToken(randomMongoId);
      const response = await request(app)
        .get(`${baseURL}?page=${page}&perPage=${perPage}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toMatch('User Not Found');
    });
  });
});
