const mongoose = require('mongoose');
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
      index: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
          index: true,
        },
        type: {
          type: String,
          required: true,
          enum: ['access', 'refresh'],
        },
        valid: {
          type: Boolean,
          default: true,
        },
        expiresAt: {
          type: Date,
          required: true,
        },
      },
    ],
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

userSchema.methods.toJSON = function () {
  const userRaw = this;
  return Object.fromEntries(
    Object.entries(userRaw.toObject()).filter(([key]) => !['password', '__v'].includes(key)),
  );
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await encryptor.hashPassword(user.password);
  }
  next();
});

module.exports.User = mongoose.model('User', userSchema);
