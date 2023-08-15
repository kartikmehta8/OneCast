const express = require('express');
const {
  sendMessage,
  getChannels,
} = require('../../controllers/bots/slackController');

const router = express.Router();

router.post('/', sendMessage);
router.get('/getChannels', getChannels);

module.exports = router;
