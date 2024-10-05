import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: 'Send all required fields: title, author, publishYear'});
        } 

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Route for Get All Books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Route for Get One Book from database by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Route for Updating Books from database by ID
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: 'Send all required fields!'});
        }
        
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(400).send({message: error.message});
        } 

        return res.status(200).send({message: 'Book updated successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Route for Deleting a Book from Database by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(400).send({message: error.message});
        }

        return res.status(200).send({message: 'Successfully Deleted Book!'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


export default router;