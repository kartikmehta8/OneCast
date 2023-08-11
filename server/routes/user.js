const express = require('express');
const {
  getAllUsers,
  storeUser,
  getUser,
  setUserByEmail,
  deleteUserByEmail,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', storeUser);
router.get('/:email', getUser);
router.patch('/:email', setUserByEmail);
router.delete('/:email', deleteUserByEmail);

module.exports = router;
