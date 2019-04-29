const mongoose = require('mongoose');

const {
  database,
} = require('../env/test');

const {
  createUser,
} = require('../../services/user');

beforeAll(async done => { // eslint-disable-line
  try {
    let dbUrl;
    if (database.user && database.password) {
      dbUrl = `${database.user}:${database.password}@${database.host}:${database.port}/${database.name}`;
    } else {
      dbUrl = `${database.host}:${database.port}/${database.name}`;
    }

    await mongoose.connect(`mongodb://${dbUrl}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    mongoose.connection.db.dropCollection('users');

    const params = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12341234',
    };

    await createUser(params);
    done();
  } catch (error) {
    throw new Error(error);
  }
});

afterAll(done => { // eslint-disable-line
  try {
    mongoose.disconnect();
    done();
  } catch (error) {
    throw new Error(error);
  }
});
