const mongoose = require('mongoose');
const { omit } = require('lodash');
const { encryptor } = require('../helpers');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    id: false,
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

userSchema.methods.toJSON = function() {
  const userRaw = this;
  return omit(userRaw.toObject(), ['password', '__v']);
};

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await encryptor.hashPassword(user.password);
  }
  next();
});

module.exports.User = mongoose.model('User', userSchema);
