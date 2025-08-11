const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const Book = require("./models/books.models");

const app = express();
app.use(express.json());

initializeDatabase();

// 1. Add a new book
app.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Get all books
app.get("/all", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get book by title
app.get("/title/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Get books by author
app.get("/author/:author", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    if (!books.length) return res.status(404).json({ error: "No books found" });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Get all Business genre books
app.get("/business", async (req, res) => {
  try {
    const books = await Book.find({ genre: "Business" });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Get all books from 2012
app.get("/year2012", async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: 2012 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Update rating by ID
app.patch("/update-rating/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { rating: req.body.rating },
      { new: true }
    );
    if (!book) return res.status(404).json({ error: "Book does not exist" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Update book by title
app.patch("/update/:title", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ error: "Book does not exist" });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Delete book by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from Express Server.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // for Vercel
