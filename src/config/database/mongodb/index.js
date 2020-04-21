const mongoose = require('mongoose');

const { database } = require('../../env');
const { logger } = require('../../../utils');

module.exports = {
  connect: async () => {
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
    } catch (error) {
      logger.error('Error: ', error);
      throw error;
    }
  },
};
