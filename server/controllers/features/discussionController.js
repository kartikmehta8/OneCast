const Discussion = require('../../models/Discussion');
const User = require('../../models/User');
const moment = require('moment');
const { sendMailToUser } = require('../../utils/sendMail');

const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();

    discussions.sort((a, b) => {
      const timeA = moment(a.time, 'DD/MM/YYYY h:mm A').toDate();
      const timeB = moment(b.time, 'DD/MM/YYYY h:mm A').toDate();
      return timeB - timeA;
    });

    res.status(200).json(discussions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const sendDiscussion = async (req, res) => {
  const { email, message, notify } = req.body;

  const _time = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  const time = moment(_time, 'M/D/YYYY, h:mm:ss A').format('DD/MM/YYYY h:mm A');

  const newDiscussion = new Discussion({
    email: email,
    message: message,
    time: time,
  });

  try {
    await newDiscussion.save();

    if (notify === true) {
      const users = await User.find();

      users.forEach((user) => {
        if (user.email !== email) {
          sendMailToUser(email, user.email, message);
        }
      });
    }

    res.status(201).json(newDiscussion);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteDiscussion = async (req, res) => {
  const { id } = req.params;

  try {
    await Discussion.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: 'Discussion deleted successfully.', success: true });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

module.exports = {
  getAllDiscussions,
  sendDiscussion,
  deleteDiscussion,
};
