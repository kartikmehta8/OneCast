const express = require('express');
const { storeData } = require('../controllers/storeController');

const router = express.Router();

router.post('/', storeData);

module.exports = router;
