const axios = require('axios');

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TOKEN}`;
const CHANNEL_ID = '@onecasttest';

const sendMessageToChannel = async (message, imgURL) => {
  try {
    const formData = new FormData();
    const axiosConfig = {};

    formData.append('chat_id', CHANNEL_ID);

    if (imgURL) {
      formData.append('caption', message);
      formData.append('photo', imgURL);
      axiosConfig.headers = {
        'Content-Type': 'multipart/form-data',
      };
    } else {
      formData.append('text', message);
    }

    const { data } = await axios.post(
      `${TELEGRAM_API}/${imgURL ? 'sendPhoto' : 'sendMessage'}`,
      formData,
      axiosConfig
    );

    return { status: 'OK', data: data };
  } catch (error) {
    return { status: 'ERROR', data: error };
  }
};

const sendMessage = async (req, res) => {
  const { body, imgURL } = req.body;
  const { status, data } = await sendMessageToChannel(body, imgURL);

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
