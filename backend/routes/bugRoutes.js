const express = require('express');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');
const { createBug, getBugs, getBugById, assignBug, startWork } = require('../controllers/bugController');
const router = express.Router();

router.post('/', requireAuth, requireRole('reporter'), createBug);
router.get('/', requireAuth, getBugs);
router.get('/:id', requireAuth, getBugById);
router.patch('/:id/assign', requireAuth, requireRole('developer'), assignBug);
router.patch('/:id/start', requireAuth, requireRole('developer'), startWork);

module.exports = router;