const axios = require('axios');
const webhookURL = process.env.WEBHOOK_URL;
;

async function sendMessageToChannel(message) {
  try {
    const response = await axios.post(webhookURL, {
      content: message
    });
    return { status: 'OK', data: response.data };
  } catch (error) {
    return { status: 'ERROR', data: error.response ? error.response.data : error.message };
  }
}

async function sendMessage(req, res, next) {
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
