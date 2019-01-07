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
      return error;
    }
  },

  getUserById: (id) => {
    try {
      return model.findById(id);
    } catch (error) {
      return error;
    }
  },

  getUserByEmail: (email) => {
    try {
      return model.findOne({ email }, { _id: false });
    } catch (error) {
      return error;
    }
  },

  createUser: (params) => {
    try {
      return model.create(params);
    } catch (error) {
      return error;
    }
  },

  updateUser: (id, params) => {
    try {
      return model.findByIdAndUpdate(id, { $set: params }, { new: true });
    } catch (error) {
      return error;
    }
  },

  deleteUser: (id) => {
    try {
      return model.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  },
};
