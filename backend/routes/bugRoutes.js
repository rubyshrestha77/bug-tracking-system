const express = require('express');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', requireAuth, requireRole('reporter'), (req, res) => {
    res.status(200).json({ message: 'Reporter-only endpoint reached' });
});

router.patch('/:id/triage', requireAuth, requireRole('developer'), (req, res) => {
    res.status(200).json({ message: 'Developer-only endpoint reached' });
});

module.exports = router;