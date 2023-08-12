const Announcement = require('../models/Announcement');
const moment = require('moment');

const storeData = async (req, res) => {
  const { email, subject, body, slack, telegram, discord } = req.body;
  const _time = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });
  const time = moment(_time, 'M/D/YYYY, h:mm:ss A').format('DD/MM/YYYY h:mm A');

  const newAnnouncement = new Announcement({
    email,
    subject,
    body,
    slack,
    telegram,
    discord,
    time,
  });

  try {
    await newAnnouncement.save();
    res.send({
      success: true,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

const getDataByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const data = await Announcement.find({ email });
    data.sort((a, b) => {
      const timeA = moment(a.time, 'DD/MM/YYYY h:mm A').toDate();
      const timeB = moment(b.time, 'DD/MM/YYYY h:mm A').toDate();
      return timeB - timeA;
    });
    res.send({
      success: true,
      data,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

const getAllData = async (req, res) => {
  try {
    const data = await Announcement.find({});
    data.sort((a, b) => {
      const timeA = moment(a.time, 'DD/MM/YYYY h:mm A').toDate();
      const timeB = moment(b.time, 'DD/MM/YYYY h:mm A').toDate();
      return timeB - timeA;
    });
    res.send({
      success: true,
      data,
    });
  } catch (err) {
    res.send({
      success: false,
      error: err,
    });
  }
};

module.exports = {
  storeData,
  getDataByEmail,
  getAllData,
};
