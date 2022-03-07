const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const roleController = require('./controllers/roleController')

//read file .env
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');
dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = process.env.DB_URL;

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successfully");
});

//init role collection
roleController.initial();

//use user router in /routes/userRouter.js
app.use('/', userRouter);

//user login router in /routes/loginRouter.js
app.use('/', authRouter)


//app listen port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
