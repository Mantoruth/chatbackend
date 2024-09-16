const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Required for Socket.io
const { Server } = require('socket.io'); // Import Socket.io
const { sequelize } = require('./db'); // Database connection
const Message = require('./models/Message'); // Import Message model
const authRouter = require('./routes/auth'); // Ensure this path is correct

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS setup
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Log incoming API requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Optionally handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// GET request to /messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST request to /messages
app.post('/messages', async (req, res) => {
  const { text, content, userId } = req.body; // Expecting a JSON body with 'text', 'content', and optionally 'userId'

  if (!text || !content) {
    return res.status(400).json({ error: 'Text and content are required' });
  }

  try {
    const newMessage = await Message.create({ text, content, userId });
    io.emit('newMessage', newMessage); // Emit the new message to all connected clients
    res.status(201).json({ message: 'Message added successfully!', newMessage });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register routes
app.use('/auth', authRouter); // This line should correctly register the auth routes

// Sync database and start server
sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});