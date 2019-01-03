const mongoose = require('mongoose');
const {
  userSchema,
} = require('../models/user/schema');

const model = mongoose.model('User', userSchema);

module.exports = {
  getUsers: () => {
    try {
      return model.find();
    } catch (error) {
      console.error(error); // eslint-disable-line
      return error;
    }
  },

  getUserById: (id) => {
    try {
      return model.findById(id);
    } catch (error) {
      console.error(error); // eslint-disable-line
      return error;
    }
  },

  createUser: (params) => {
    try {
      return model.create(params);
    } catch (error) {
      console.error(error); // eslint-disable-line
      return error;
    }
  },
};
