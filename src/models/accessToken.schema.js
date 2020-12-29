const mongoose = require('mongoose');

const accessTokenSchema = mongoose.Schema(
  {
    access: {
      type: String,
      required: true,
      index: true,
    },
    refresh: {
      type: String,
      required: true,
      index: true,
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
