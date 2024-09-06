const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Required for Socket.io
const { Server } = require('socket.io'); // Import Socket.io
const { sequelize } = require('./db');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const authRouter = require('./routes/auth'); // Ensure this path is correct

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Log incoming API requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// In-memory storage for messages
let messages = [];
// GET request to /messages
app.get('/messages', (req, res) => {
  res.json(messages);
});
// POST request to /messages
app.post('/messages', (req, res) => {
  const { content } = req.body; // Expecting a JSON body with a 'content' field
  if (content) {
    const newMessage = { content, timestamp: new Date() };
    messages.push(newMessage); // Add message to the in-memory array
    res.status(201).json({ message: 'Message added successfully!', newMessage });
  } else {
    res.status(400).json({ error: 'Content is required' });
  }
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

// Register routes
app.use('/auth', authRouter); // This line should correctly register the auth routes

// Other routes...

app.listen(port, async () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  // Database connection and server start logic...
});