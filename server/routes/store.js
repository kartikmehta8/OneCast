const express = require('express');
const {
  storeData,
  getDataByEmail,
  getAllData,
} = require('../controllers/storeController');

const router = express.Router();

router.get('/', getAllData);
router.post('/', storeData);
router.get('/:email', getDataByEmail);

module.exports = router;
