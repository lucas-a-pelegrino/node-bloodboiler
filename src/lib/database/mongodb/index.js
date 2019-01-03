const mongoose = require('mongoose');
const {
  database,
  dbUser,
  dbPassword,
  host,
} = require('../../../config/config');

module.exports = {
  connect: async () => {
    try {
      let dbUrl;
      if (dbUser && dbPassword) {
        dbUrl = `${dbUser}:${dbPassword}@${host}:27017/${database}`;
      } else {
        dbUrl = `${host}:27017/${database}`;
      }

      await mongoose.connect(`mongodb://${dbUrl}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
