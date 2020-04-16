const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
      minlength: 6,
      validate(value) {
        if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/)) {
          throw new Error('password-rules-unmet');
        }
      },
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordTokenExpirationDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

userSchema.methods.toJSON = () => {
  const user = this;
  const attrToOmit = ['password', '__v', 'passwordResetToken', 'passwordResetTokenExpiration'];
  return Object.keys(user.toObject()).filter((attribute) => !attrToOmit.includes(attribute));
};

userSchema.pre('save', async (next) => {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports.User = mongoose.model('User', userSchema);
