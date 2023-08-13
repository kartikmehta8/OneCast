const Draft = require('../models/Draft');
const moment = require('moment');

const getAllDraftsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const data = await Draft.find({ email });

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

const createDraft = async (req, res) => {
  const { email, subject, body } = req.body;

  const _time = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  const time = moment(_time, 'M/D/YYYY, h:mm:ss A').format('DD/MM/YYYY h:mm A');

  const newDraft = new Draft({
    email,
    subject,
    body,
    time,
  });

  try {
    await newDraft.save();
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

const deleteDraft = async (req, res) => {
  const { id } = req.params;

  try {
    await Draft.findByIdAndDelete(id);
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

module.exports = {
  getAllDraftsByEmail,
  createDraft,
  deleteDraft,
};
