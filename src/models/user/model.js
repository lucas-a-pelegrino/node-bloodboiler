const mongoose = require('mongoose');

const { schema } = require('./schema');

// Hooks

const User = mongoose.model('User', schema);
module.exports = User;
