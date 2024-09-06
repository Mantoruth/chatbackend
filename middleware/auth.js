const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); // Ensure this path is correct

router.post('/register', async (req, res) => {
  console.log('Received registration request:', req.body); // Log the incoming request

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword); // Log the hashed password

    // Create a new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Respond with success
    res.status(201).json({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error('Registration error:', error); // Log error details
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

module.exports = router;