const axios = require('axios');

async function sendMessage(req, res) {
  try {
    const { body } = req.body;
    const message = { body };
    const response = await axios({
      method: "POST",
      url: webhookUrl = PROCESS.env.DISCORD_WEBHOOK_URL,
      data: message
    })

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
module.exports = {
  sendMessage,
};