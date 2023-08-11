const express = require('express');
const { textController } = require('../controllers/textController.js');

const router = express.Router();

router.post('/', textController);

module.exports = router;
