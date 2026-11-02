/**
 * index.js
 * 
 * Main Entry Point for BookVault Express Application:
 * - Loads environment variables (.env)
 * - Connects to MongoDB Atlas via Mongoose
 * - Serves static frontend files (HTML/CSS) from /public
 * - Mounts CRUD API routes at /api/books
 * - Starts the HTTP server on configured PORT
 */

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Import Books Router
const bookRoutes = require('./routes/book.route');

// ==========================================
// Middleware Configuration
// ==========================================

// Parse incoming JSON payloads (required for POST & PUT request bodies)
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (HTML, CSS, JS) from the "public" directory
// Visiting http://localhost:3000 will automatically serve public/index.html
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// API Routes
// ==========================================

// Mount all book CRUD routes under /api/books
app.use('/api/books', bookRoutes);

// Health check endpoint for evaluation testing
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    app: 'BookVault — Library Book Issue & Return Tracker',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Fallback 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// ==========================================
// MongoDB Connection & Server Initialization
// ==========================================

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('\n❌ ERROR: MONGO_URI is missing in your .env file!');
  console.error('Please configure your MongoDB connection string in .env and restart.\n');
  process.exit(1);
}

// Connect to MongoDB Atlas
console.log('🔄 Connecting to MongoDB Atlas...');

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('====================================================');
    console.log('✅ Connected successfully to MongoDB Atlas!');
    console.log('====================================================');

    // Start Express server only after successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 BookVault Server is running on: http://localhost:${PORT}`);
      console.log(`📚 Public Library UI: http://localhost:${PORT}`);
      console.log(`⚡ API Endpoints:     http://localhost:${PORT}/api/books`);
      console.log('====================================================\n');
    });
  })
  .catch((err) => {
    console.error('\n❌ Failed to connect to MongoDB Atlas:');
    console.error(err.message);
    console.log('\n💡 Beginner Troubleshooting Tips for Viva:');
    console.log('1. Check if username and password in .env are correct.');
    console.log('2. In MongoDB Atlas, go to "Network Access" and ensure IP 0.0.0.0/0 is whitelisted.');
    console.log('3. Ensure your internet connection is active.');
    console.log('----------------------------------------------------\n');
  });

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB connection disconnected.');
});
