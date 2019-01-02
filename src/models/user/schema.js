const { Schema } = require('mongoose');

// const { Schema } = mongoose.Schema;

const userSchema = new Schema({
  // Default user attributes;
  name: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
    index: true,
  },
  password: {
    type: String,
    required: [true],
  },
  meta: {
    token: String,
    os: String,
  },

  // Set other attributes for user here;
}, { timestamps: true, collection: 'users' });

module.exports = { userSchema };
