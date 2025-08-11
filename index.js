const {initializeDatabase} = require("./db/db.connect");
const express = require("express");
const app = express()
const Book = require("./models/books.models");
app.use(express.json());
initializeDatabase()

const newBook = {
  title: "Lean In",
  author: "Sheryl Sandberg",
  publishedYear: 2012,
  genre: ["Non-fiction", "Business"],
  language: "English",
  country: "United States",
  rating: 4.1,
  summary: "A book about empowering women in the workplace and achieving leadership roles.",
  coverImageUrl: "https://example.com/lean_in.jpg"
};

const newBookData = {
  title: "Shoe Dog",
  author: "Phil Knight",
  publishedYear: 2016,
  genre: ["Autobiography", "Business"],
  language: "English",
  country: "United States",
  rating: 4.5,
  summary: "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
  coverImageUrl: "https://example.com/shoe_dog.jpg"
};

async function createNewBook(newBookData){
    try{
        const book = new Book(newBookData);
        const saveBook = await book.save();
    }
    catch(error){
        throw error;
    }
}

app.get("/books", (req,res) => (
    res.send("Hello from Express Server.")
))

createNewBook(newBookData);

async function createBook(newBook){
    try{
        const book = new Book(newBook);
        const saveMovie = await book.save();
    }
    catch(error){
        throw error;
    }
}

createBook(newBook);

async function readAllBooks(){
    try{
        const allBooks = await Book.find()
        console.log(allBooks)
    }
    catch(error){
        throw error;
    }
}

readAllBooks();

async function readByTitle(bookTitle){
    try{
        const readByTitle = await Book.findOne({title: bookTitle});
        console.log(readByTitle);
    }
    catch(error){
        throw error;
    }
}
readByTitle("Lean In");

async function readByAuthor(bookAuthor){
    try{
        const author = await Book.findOne({author: bookAuthor});
        console.log(author);
    }
    catch(error){
        throw error;
    }
}

readByAuthor("Phil Knight");

async function findByGenre(bookByGenre){
    try{
        const genre = await Book.find({genre: bookByGenre});
        console.log(genre);
    }
    catch(error){
        throw error;
    }
}

findByGenre("Business");

async function findByYear(bookByYear){
    try{
        const year = await Book.find({publishedYear: bookByYear});
        console.log(year);
    }
    catch(error){
        throw error;
    }
}
findByYear(2012);

async function findByRating(bookId,dataToUpdate){
    try{
        const updateMovie = await Book.findByIdAndUpdate(bookId,dataToUpdate,{new: true});
        console.log(updateMovie);
    }
    catch(error){
        console.log(`Book does not exist`, error);
    }
}
findByRating("689980ed27a21a56c36ed0f2", {rating: 4.5})



async function findAndUpdate(bookTitle, dataToUpdate) {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { title: bookTitle },
            dataToUpdate,
            { new: true }
        );

        if (!updatedBook) {
            console.log("Book does not exist");
            return;
        }

        console.log(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error.message);
    }
}

findAndUpdate("Shoe Dog", { publishedYear: 2017, rating: 4.2 });


async function deleteBookData(bookId){
    try{
        const deleteBook = await Book.findOneAndDelete({_id: bookId});
        console.log(deleteBook);
    }
    catch(error){
        console.log(`Book not found`);
    }
}

deleteBookData("689980ed27a21a56c36ed0f3");

const PORT = 3000
app.listen(PORT,() => {
    console.log(`Running on port ${PORT}`);
})