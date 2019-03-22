const mongoose = require('mongoose');

const {
  database,
} = require('../config/env/development');

const {
  createUser,
} = require('../services/user');

beforeAll(async done => { // eslint-disable-line
  try {
    console.log('Finish beforeall');
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

afterAll(async done => { // eslint-disable-line
  try {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    console.log('Finish afterall');
    done();
  } catch (error) {
    throw new Error(error);
  }
});
