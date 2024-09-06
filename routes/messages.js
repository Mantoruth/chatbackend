const express = require('express');
const router = express.Router();
const { Message } = require('../models'); // Adjust path based on your directory structure
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audio');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET /messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /messages
router.post('/', async (req, res) => {
  try {
    const { content, sender } = req.body;
    const newMessage = await Message.create({ content, sender });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /messages/audio
router.post('/audio', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'Invalid audio file' });
    }

    const { sender } = req.body;
    const newMessage = await Message.create({
      content: req.file.path,
      sender,
      type: 'audio',
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
