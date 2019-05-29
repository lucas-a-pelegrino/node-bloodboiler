const mongoose = require('mongoose');
const userSchema = require('../models/user/schema');

const model = mongoose.model('User', userSchema);

module.exports = {
  getUsers: (query) => {
    try {
      return model.aggregate(query);
    } catch (error) {
      throw error;
    }
  },

  getUserById: (id) => {
    try {
      return model.findById(id);
    } catch (error) {
      throw error;
    }
  },

  getUserBy: (param) => {
    try {
      return model.findOne(param);
    } catch (error) {
      throw error;
    }
  },

  createUser: (params) => {
    try {
      return model.create(params);
    } catch (error) {
      throw error;
    }
  },

  updateUser: (id, params) => {
    try {
      return model.findByIdAndUpdate(id, { $set: params }, { new: true });
    } catch (error) {
      throw error;
    }
  },

  deleteUser: (id) => {
    try {
      return model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },
};
