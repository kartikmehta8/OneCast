const express = require('express');
const { storeData, getDataByEmail } = require('../controllers/storeController');

const router = express.Router();

router.post('/', storeData);
router.get('/:email', getDataByEmail);

module.exports = router;
