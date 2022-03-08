const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

//Get all list user
userRouter.get("/user", userController.getAllUser)

//Get user by id
userRouter.get('/user/:userName', userController.getUserById)
//Add new user
userRouter.post('/user', userController.addNewUser)

//Update user
userRouter.patch('/user/:id', userController.updateUser)

//Delete user
userRouter.delete('/user/:id', userController.deleteUser)

module.exports = userRouter