const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
