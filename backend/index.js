import express, { request } from 'express';
import { PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handing CORS POLICY
app.use(cors());

// Allow Custom Origins
/*
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))
*/

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome to MERN Stack Tutorial');
})

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})
