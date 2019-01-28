const { Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: 'name-is-required',
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

  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiresAt: {
    type: Date,
  },

}, { timestamps: true });

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = { userSchema };
