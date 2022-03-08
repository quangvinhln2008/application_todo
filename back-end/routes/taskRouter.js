const express = require("express");
const checkDuplicateTask = require("../middleware/checkDuplicationTask")

const taskRouter = express.Router();
const taskController = require("../controllers/taskController");

//Get all list task
taskRouter.get("/", taskController.getAllTask)

// //Get task by id
// taskRouter.get('/task/:id', taskController.gettaskById)

// //Add new task
// taskRouter.post('/', [
//     checkDuplicateTask.checkDuplicatetaskId
// ],
//     taskController.addNewTask
// );

// // //Update task
// taskRouter.patch('/:taskId', taskController.updateTask)

// // //Delete task
// taskRouter.delete('/:taskId', taskController.deleteTask)

module.exports = taskRouter