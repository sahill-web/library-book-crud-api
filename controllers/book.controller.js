/**
 * controllers/book.controller.js
 * 
 * Express Controller functions handling CRUD business logic for Library Books:
 * 1. createBook   - POST   /api/books     (Create new book record)
 * 2. getAllBooks  - GET    /api/books     (Read all books, newest first)
 * 3. getBookById  - GET    /api/books/:id (Read single book by MongoDB ID)
 * 4. updateBook   - PUT    /api/books/:id (Update book, e.g. Issue/Return)
 * 5. deleteBook   - DELETE /api/books/:id (Delete book by MongoDB ID)
 */

const Book = require('../models/book.model');

/**
 * @desc   1. CREATE: Add a new book to the library
 * @route  POST /api/books
 * @access Public
 */
const createBook = async (req, res) => {
  try {
    const { bookTitle, author, genre, studentRollNo, status } = req.body;

    // Create new book instance using data from request body
    const newBook = new Book({
      bookTitle,
      author,
      genre,
      studentRollNo: studentRollNo && studentRollNo.trim() !== '' ? studentRollNo.trim() : 'None',
      status: status || 'Available'
    });

    // Save to MongoDB
    const savedBook = await newBook.save();

    // Return HTTP 201 Created with the created book object
    return res.status(201).json({
      success: true,
      message: 'Book registered successfully',
      data: savedBook
    });
  } catch (error) {
    // Handle validation errors or missing required fields
    return res.status(400).json({
      success: false,
      message: 'Failed to create book',
      error: error.message
    });
  }
};

/**
 * @desc   2. READ ALL: Fetch all library books (sorted newest first)
 * @route  GET /api/books
 * @access Public
 */
const getAllBooks = async (req, res) => {
  try {
    // Fetch all books sorted by newest creation date first (-1)
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve books from database',
      error: error.message
    });
  }
};

/**
 * @desc   3. READ ONE: Fetch a single book by MongoDB _id
 * @route  GET /api/books/:id
 * @access Public
 */
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    // If no book found with this ID, return 404 Not Found
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `No book found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    // If invalid MongoDB ObjectId format or server error
    return res.status(400).json({
      success: false,
      message: 'Invalid Book ID format',
      error: error.message
    });
  }
};

/**
 * @desc   4. UPDATE: Update book details or issue/return status by _id
 * @route  PUT /api/books/:id
 * @access Public
 */
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If status is changed to 'Available', reset studentRollNo to 'None' if not explicitly provided
    if (updateData.status === 'Available' && !updateData.studentRollNo) {
      updateData.studentRollNo = 'None';
    }

    // findByIdAndUpdate with:
    // - { new: true } : returns the modified document rather than the original
    // - { runValidators: true } : ensures schema enum/required validations run on updates
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: `Cannot update. No book found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to update book',
      error: error.message
    });
  }
};

/**
 * @desc   5. DELETE: Remove a book record by _id
 * @route  DELETE /api/books/:id
 * @access Public
 */
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete record from MongoDB
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: `Cannot delete. No book found with ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Book "${deletedBook.bookTitle}" has been deleted successfully`,
      data: deletedBook
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Failed to delete book',
      error: error.message
    });
  }
};

// Export all 5 controller functions
module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
