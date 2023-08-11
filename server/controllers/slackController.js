const axios = require('axios');

const sendMessage = async (req, res) => {
  const { body } = req.body;

  const SLACK_CHANNEL_ID = 'C05LZV3TZ7X';

  const url = `https://slack.com/api/chat.postMessage`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
  };
  const data = {
    channel: SLACK_CHANNEL_ID,
    text: body,
  };

  try {
    const response = await axios.post(url, data, { headers });
    if (response.status === 200) {
      res.send({
        success: true,
        message: 'Message sent successfully',
      });
    } else {
      res.send({
        success: false,
        message: 'Message failed to send',
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getChannels = async (req, res) => {
  const url = `https://slack.com/api/conversations.list`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
  };

  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      const channels = response.data.channels.map((channel) => {
        return {
          id: channel.id,
          name: channel.name,
        };
      });
      res.send({
        success: true,
        message: 'Channels fetched successfully',
        data: channels,
      });
    } else {
      res.send({
        success: false,
        message: 'Channels failed to fetch',
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getChannels,
};
