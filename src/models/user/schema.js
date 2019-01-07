const { Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  meta: {
    token: String,
    os: String,
  },

}, { timestamps: true });

module.exports = { userSchema };
