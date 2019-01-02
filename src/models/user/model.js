const mongoose = require('mongoose');

const { schema } = require('./schema');

// Add hooks here;

const User = mongoose.model('User', schema);
module.exports = User;
