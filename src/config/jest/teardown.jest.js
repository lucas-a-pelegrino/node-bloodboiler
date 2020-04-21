const mongoose = require('mongoose');
const { logger } = require('../../utils');

module.exports = async () => {
  try {
    await mongoose.connection.db.dropCollection('users');
    logger.info('Test db cleared and disconnected successfully.');
    process.exit();
  } catch (error) {
    throw new Error(error);
  }
};
