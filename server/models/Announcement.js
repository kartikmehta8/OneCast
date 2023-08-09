const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
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
  discord: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
