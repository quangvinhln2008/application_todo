const express = require("express");
const checkDuplicateTask = require("../middleware/checkDuplicationTask")

const taskRouter = express.Router();
const taskController = require("../controllers/taskController");

//Get all list task
taskRouter.get("/", taskController.getAllTask)

// //Get task by id
taskRouter.get('/:taskId', taskController.getTaskById)

// // //Get task by projectId
// taskRouter.get('/:projectId/task', taskController.getTaskByProjectId)

//Add new task
taskRouter.post('/', [
    checkDuplicateTask.checkDuplicateTaskId
],
    taskController.addNewTask
);

// //Update task
taskRouter.patch('/edit/:taskId', taskController.updateTask)

// // //Delete task
taskRouter.delete('/:taskId', taskController.deleteTask)

module.exports = taskRouter