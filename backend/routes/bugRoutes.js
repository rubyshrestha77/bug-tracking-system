const express = require('express');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');
const { createBug, getBugs, getBugById } = require('../controllers/bugController');
const router = express.Router();

router.post('/', requireAuth, requireRole('reporter'), createBug);
router.get('/', requireAuth, getBugs);
router.get('/:id', requireAuth, getBugById);

module.exports = router;