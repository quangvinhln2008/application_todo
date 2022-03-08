const express = require("express");
const checkDuplicateProject = require("../middleware/checkDuplicationProject")

const projectRouter = express.Router();

const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController")

//Get all list project
projectRouter.get("/", projectController.getAllProject)

//Get project by id
projectRouter.get('/:projectId', projectController.getProjectById)

// //Get task by projectId
projectRouter.get('/:projectId/task', taskController.getTaskByProjectId)

//Add new project
projectRouter.post('/', [
    checkDuplicateProject.checkDuplicateProjectId
],
    projectController.addNewProject
);

// //Update project
projectRouter.patch('/edit/:projectId', projectController.updateProject)

// //Delete project
projectRouter.delete('/:projectId', projectController.deleteProject)

module.exports = projectRouter