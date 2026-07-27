const express = require('express');
const router = express.Router();
const { createPickup,getUserPickups, updatePickupStatus, addFeedback } = require('../controllers/pickupsController');

router.post('/', createPickup);
router.get('/:userId', getUserPickups);
router.patch('/:id', updatePickupStatus);
router.post('/:id/feedback', addFeedback);

module.exports = router;