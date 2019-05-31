const mongoose = require('mongoose');

module.exports = async () => {
  try {
    mongoose.connection.db.dropCollection('users');
    console.info('Test db cleared and disconnected successfully.'); //eslint-disable-line
  } catch (error) {
    throw new Error(error);
  }
};
