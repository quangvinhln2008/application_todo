const express = require("express");

const projectRouter = express.Router();
const projectController = require("../controllers/projectController");

//Get all list project
projectRouter.get("/", projectController.getAllProject)

// //Get project by id
// projectRouter.get('/project/:id', projectController.getprojectById)

//Add new project
projectRouter.post('/', projectController.addNewProject)

// //Update project
// projectRouter.patch('/project/:id', projectController.updateproject)

// //Delete project
// projectRouter.delete('/project/:id', projectController.deleteproject)

module.exports = projectRouter