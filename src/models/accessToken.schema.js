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
      default: false,
    },
  },
  {
    timestamps: true,
    id: false,
  },
);

module.exports.AccessToken = accessTokenSchema;
