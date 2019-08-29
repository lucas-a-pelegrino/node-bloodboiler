const mongoose = require('mongoose');

const {
  database,
} = require(`../env/test`); //eslint-disable-line
const {
  createUser,
} = require('../../services/user');

const connect = async () => {
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

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = async () => {
  try {
    const params = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '12341234',
    };

    const connection = await connect();

    if (connection) {
      const testUser = await createUser(params);

      if (testUser) {
        console.info('Test user successfully connected.'); //eslint-disable-line
      } else {
        console.info('Test user creation failed.'); //eslint-disable-line
      }
    }
  } catch (error) {
    console.error(error); //eslint-disable-line
    throw new Error(error);
  }
};
