const express = require('express');
const {
  getAllUsers,
  storeUser,
  setUserByEmail,
  deleteUserByEmail,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', storeUser);
router.patch('/:email', setUserByEmail);
router.delete('/:email', deleteUserByEmail);

module.exports = router;
