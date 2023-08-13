const express = require('express');
const { sendMessage } = require('../controllers/discordController');

const router = express.Router();

router.post('/', sendMessage);

module.exports = router;
