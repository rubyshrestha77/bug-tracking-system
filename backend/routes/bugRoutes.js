const express = require('express');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');
const { createBug } = require('../controllers/bugController');
const router = express.Router();

router.post('/', requireAuth, requireRole('reporter'), createBug);

module.exports = router;