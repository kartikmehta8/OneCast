const axios = require('axios');

async function sendMessage(req, res, next) {
  try {
    const { body } = req.body;
    const webhookURL = 'https://discord.com/api/webhooks/1139542261881905253/Ja9FhJQmnweVq27h9euq0R-z9X1gWC4-wpD8hFep7Fc1DLWlRc6CbzdkFc1opEh2Hobf';
    
    const response = await axios.post(webhookURL, {
      content: body
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  sendMessage,
};