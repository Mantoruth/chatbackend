const express = require('express');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Example of a protected route
router.get('/dashboard', authenticate, (req, res) => {
  res.json({ success: true, message: 'Welcome to the protected dashboard!' });
});

// Add more protected routes here

module.exports = router;
