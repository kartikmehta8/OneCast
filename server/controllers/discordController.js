const axios = require('axios');
const { Client, IntentsBitField } = require('discord.js');

const BOT_TOKEN = 'MTEzOTE4NTY4OTEyNTE5MTczMA.GmBxRt.otnaGK2eLV3Jn7OlK0gNYXQWv1JDeTF_5tl5FI';
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const sendMessageToDiscordChannel = async (message) => {
  try {
    const channelID = '1139074914826059777'; // Replace with your desired channel ID
    const channel = await client.channels.fetch(channelID);

    if (channel.isText()) {
      await channel.send(message);
      return { success: true, message: 'Message sent successfully' };
    } else {
      return { success: false, message: 'Invalid channel type' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const sendMessage = async (req, res) => {
  const { body } = req.body;

  const response = await sendMessageToDiscordChannel(body);

  if (response.success) {
    res.send({
      success: true,
      message: response.message,
    });
  } else {
    res.send({
      success: false,
      message: response.message,
    });
  }
};

client.login(BOT_TOKEN);
module.exports = {
  sendMessage,
};