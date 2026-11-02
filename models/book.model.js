/**
 * models/book.model.js
 * 
 * Mongoose Schema and Model for BookVault.
 * Defines the structure, data types, validation rules, and default values
 * for each library book record stored in MongoDB.
 */

const mongoose = require('mongoose');

// Define Schema for a Book
const bookSchema = new mongoose.Schema(
  {
    // Title of the book (e.g., "Clean Code")
    bookTitle: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true
    },

    // Author of the book (e.g., "Robert C. Martin")
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true
    },

    // Category / Department genre with allowed list validation
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: {
        values: ['Computer Science', 'Mathematics', 'Electronics', 'General'],
        message: '{VALUE} is not a valid genre. Must be Computer Science, Mathematics, Electronics, or General.'
      }
    },

    // Student Roll Number holding the book ("None" if available in library)
    studentRollNo: {
      type: String,
      default: 'None',
      trim: true
    },

    // Current availability status of the book
    status: {
      type: String,
      default: 'Available',
      enum: {
        values: ['Available', 'Issued'],
        message: 'Status must be either Available or Issued.'
      }
    }
  },
  {
    // Automatically creates and manages 'createdAt' and 'updatedAt' fields
    timestamps: true
  }
);

// Create and export Mongoose Model
// 'Book' will map to MongoDB collection named 'books'
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
