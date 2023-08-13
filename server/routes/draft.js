const express = require('express');
const {
  getAllDraftsByEmail,
  createDraft,
  deleteDraft,
} = require('../controllers/draftController');

const router = express.Router();

router.get('/:email', getAllDraftsByEmail);
router.post('/', createDraft);
router.delete('/:id', deleteDraft);

module.exports = router;
