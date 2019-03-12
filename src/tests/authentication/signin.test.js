const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../config/express');

describe('Sign in', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('Basic', async () => {
    expect(2 + 2).toBe(4);
  });
});
