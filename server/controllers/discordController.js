const axios = require('axios');

async function sendMessage(req, res, next) {
  try {
    const { content, webhookUrl } = req.body;

    // Create a message to be sent to the Discord channel
    const message = {
      content,
      username: "Tushar"
    };

    const response = await axios({
      method: "POST",
      url: webhookUrl,
      data: message
    })
    console.log(response.status);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
}
module.exports = {
  sendMessage,
};