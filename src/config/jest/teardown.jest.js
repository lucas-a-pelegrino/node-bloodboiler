const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connection.db.dropCollection('users');
    console.info('Test db cleared and disconnected successfully.');
    process.exit();
  } catch (error) {
    throw new Error(error);
  }
};
