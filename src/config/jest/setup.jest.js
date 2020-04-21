const mongoose = require('mongoose');
const { database } = require('../env');
const { logger } = require('../../utils');

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
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = async () => {
  try {
    await connect();
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};
