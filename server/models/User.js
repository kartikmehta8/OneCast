const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  discord: {
    type: Boolean,
    required: true,
  },
  slack: {
    type: Boolean,
    required: true,
  },
  telegram: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('User', User);