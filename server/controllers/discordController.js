const axios = require('axios');
const { Client, IntentsBitField } = require('discord.js');

const BOT_TOKEN = '';
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

async function sendMessage( req, res, next) {
  try {
    const { content } = req.body;

    // Create a message to be sent to the Discord channel
    const message = {
      content,
    };

    // Send the message using Axios
    await axios.post(`https://discord.com/api/v10/channels/1139074914826059777/messages`, message, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
}
module.exports = {
  sendMessage,
};