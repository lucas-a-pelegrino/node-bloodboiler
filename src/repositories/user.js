const mongoose = require('mongoose');
const {
  users,
} = require('../models/user/schema');

module.exports = {
  getUsers: (filters) => {
    const model = mongoose.model('User', users);

    try {
      return model.find(filters);
    } catch (error) {
      console.error(error); // eslint-disable-line
      return error;
    }
  },
};
