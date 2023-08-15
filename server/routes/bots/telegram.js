const express = require('express');
const { sendMessage } = require('../../controllers/bots/telegramController');

const router = express.Router();

router.post('/', sendMessage);

module.exports = router;
