const mongoose = require('mongoose');

const TokenTypes = {
  refresh: 'refresh-token',
  reset: 'reset-token',
};

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tokenType: {
      type: String,
      enum: [TokenTypes.refresh, TokenTypes.reset],
      required: true,
    },
    hasExpired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    id: false,
  },
);

module.exports.TokenTypes = TokenTypes;

module.exports.Token = mongoose.model('Token', tokenSchema);
