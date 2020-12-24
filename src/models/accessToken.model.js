const mongoose = require('mongoose');

const accessTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['access', 'refresh'],
      required: true,
    },
    expired: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    id: false,
  },
);

module.exports.AccessToken = mongoose.model('AccessToken', accessTokenSchema);
