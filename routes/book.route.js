/**
 * routes/book.route.js
 * 
 * Express Router for Library Books.
 * Maps HTTP REST verbs (POST, GET, PUT, DELETE) to their respective controller functions.
 * Mounted at: /api/books
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/book.controller');

// Route 1: CREATE a new book & Route 2: READ ALL books
router.route('/')
  .post(createBook)     // POST /api/books
  .get(getAllBooks);    // GET  /api/books

// Route 3: READ ONE, Route 4: UPDATE, & Route 5: DELETE by ID
router.route('/:id')
  .get(getBookById)     // GET    /api/books/:id
  .put(updateBook)      // PUT    /api/books/:id
  .delete(deleteBook);  // DELETE /api/books/:id

module.exports = router;
