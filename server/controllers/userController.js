const User = require('../models/User');
const moment = require('moment');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    users.sort((a, b) => {
      const timeA = moment(a.time, 'DD/MM/YYYY').toDate();
      const timeB = moment(b.time, 'DD/MM/YYYY').toDate();
      return timeB - timeA;
    });
    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Internal Server Error',
      error,
    });
  }
};

const storeUser = async (req, res) => {
  const { email, discord, slack, telegram } = req.body;
  const _time = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });
  const time = moment(_time, 'M/D/YYYY, h:mm:ss A').format('DD/MM/YYYY');

  const newUser = new User({
    email,
    discord,
    slack,
    telegram,
    time,
  });

  try {
    await newUser.save();
    res.status(201).send({
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Internal Server Error',
      error,
    });
  }
};

const setUserByEmail = async (req, res) => {
  const { email } = req.params;
  const { discord, slack, telegram, time } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        status: 'Not Found',
        message: 'User not found',
      });
    }

    user.discord = discord;
    user.slack = slack;
    user.telegram = telegram;
    user.time = time;

    await user.save();

    res.status(200).send({
      status: 'Success',
      message: 'User information updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Internal Server Error',
      error,
    });
  }
};

const deleteUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).send({
        status: 'Not Found',
        message: 'User not found',
      });
    }

    res.status(200).send({
      status: 'Success',
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).send({
      status: 'Internal Server Error',
      error,
    });
  }
};

const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        status: 'Not Found',
        message: 'User not found',
        success: false,
      });
    } else {
      res.status(200).send({
        status: 'Success',
        message: 'User found',
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'Internal Server Error',
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllUsers,
  storeUser,
  setUserByEmail,
  deleteUserByEmail,
  getUser,
};
