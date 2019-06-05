const mongoose = require('mongoose');

module.exports = async () => {
  try {
    mongoose.connection.db.dropCollection('users');
    console.info('Test db cleared and disconnected successfully.'); //eslint-disable-line
    process.exit();
  } catch (error) {
    throw new Error(error);
  }
};
