const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const projectRouter = require('./routes/projectRouter');
const roleController = require('./controllers/roleController')

const authRouter = require('./routes/authRouter');
//read file .env
const dotenv = require('dotenv');
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


//user login router in /routes/loginRouter.js
app.use('/', authRouter)

//use user router in /routes/userRouter.js
app.use('/', userRouter);

//use project router in /routes/projectRouter.js
app.use('/project', projectRouter);


//app listen port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
