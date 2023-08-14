const express = require('express');

const {
  getAllDiscussions,
  sendDiscussion,
  deleteDiscussion,
} = require('../controllers/discussionController');

const router = express.Router();

router.get('/', getAllDiscussions);
router.post('/', sendDiscussion);
router.delete('/:id', deleteDiscussion);

module.exports = router;
