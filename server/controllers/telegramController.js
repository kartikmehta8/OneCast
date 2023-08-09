const axios = require('axios');

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TOKEN}`;
const CHANNEL_ID = '@onecasttest';

const sendMessageToChannel = async (message) => {
  try {
    const { data } = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: CHANNEL_ID,
      text: message,
    });

    return { status: 'OK', data: data };
  } catch (error) {
    return { status: 'ERROR', data: error };
  }
};

const sendMessage = async (req, res) => {
  const { body } = req.body;
  const { status, data } = await sendMessageToChannel(body);

  if (status === 'OK') {
    res.send({
      status: 'OK',
      success: true,
      data: data,
    });
  } else {
    res.send({
      status: 'ERROR',
      success: false,
      data: data,
    });
  }
};

module.exports = {
  sendMessage,
};
