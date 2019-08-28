const mongoose = require('mongoose');

const {
  [process.env.NODE_ENV]: { database },
} = require('../../env');


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
        useFindAndModify: false,
      });
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  },
};
