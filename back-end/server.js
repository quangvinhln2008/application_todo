const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');

//read file .env
const dotenv = require('dotenv');
const loginRouter = require('./routes/loginRouter');
dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

const uri = process.env.DB_URL;

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successfully");
});

//app listen port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//use user router in /routes/userRouter.js
app.use('/', userRouter);

//user login router in /routes/loginRouter.js
app.use('/', loginRouter)