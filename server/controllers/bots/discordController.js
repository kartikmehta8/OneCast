
const axios = require('axios');
const webhookURL = process.env.WEBHOOK_URL;

async function sendMessageToChannel(message, imgURL) {
  try {
    const payload = {
      content: message,
      embeds: [],
    };

    if (imgURL) {
      payload.embeds.push({
        image: {
          url: imgURL,
        },
      });
    }

    const response = await axios.post(webhookURL, payload);

    return { status: 'OK', data: response.config.data };
  } catch (error) {
    return {
      status: 'ERROR',
      data: error.response.data,
    };
  }
}

async function sendMessage(req, res) {
  const { body, imgURL } = req.body;

  if (!body) {
    return res.status(400).send({
      status: 'ERROR',
      success: false,
      message: 'Message body is required.',
    });
  }

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
}

module.exports = {
  sendMessage,
};

