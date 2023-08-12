const axios = require('axios');

async function sendMessage(req, res, next) {
  try {
    const { body } = req.body;
    const webhookURL = process.env.WEBHOOK_URL;
    
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