const mongoose = require('mongoose');
const {
  createUser,
} = require('../../services/user');

beforeAll(done => { // eslint-disable-line
  try {
    const params = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12341234',
    };

    createUser(params);
    done();
  } catch (error) {
    throw new Error(error);
  }
});

afterAll(done => { // eslint-disable-line
  try {
    mongoose.connection.db.dropCollection('users');
    mongoose.disconnect();
    done();
  } catch (error) {
    throw new Error(error);
  }
});
