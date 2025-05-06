const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// Define Book schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String,
});

// Create Book model
const Book = mongoose.model('Book', bookSchema);

// Add a new book
app.post('/books', async (req, res) => {
    const { title, author, price, genre } = req.body;
    const newBook = new Book({ title, author, price, genre });

    try {
        await newBook.save();
        res.status(201).send('Book added successfully');
    } catch (error) {
        res.status(400).send('Error adding book');
    }
});

// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send('Error retrieving books');
    }
});

// Update book details
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, price, genre } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, genre }, { new: true });
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).send('Error updating book');
    }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send('Book deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting book');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
