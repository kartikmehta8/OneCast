const axios = require('axios');
const webhookURL = 'https://discord.com/api/webhooks/1139542261881905253/Ja9FhJQmnweVq27h9euq0R-z9X1gWC4-wpD8hFep7Fc1DLWlRc6CbzdkFc1opEh2Hobf';

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
