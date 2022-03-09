const Project = require("../models/project");
const User = require("../models/user");
const Task = require("../models/task");
const Role = require("../models/role");
const { default: mongoose } = require("mongoose");

exports.getAllTask = async (req, res) => {
  await Task.find()
    .populate("belongTo")
    .populate("assignTo")
    .populate("userRole")
    .exec((err, task) => {
      if (err) res.status(500).send({ message: err });
      res.json(task);
    });
};

exports.getTaskById = async (req, res) => {
  await Task.findOne({
    taskId: req.params.taskId.toUpperCase(),
  })
    .populate("belongTo")
    .populate("assignTo")
    .populate("userRole")
    .exec((err, task) => {
      if (err) res.status(500).send({ message: err });
      res.json(task);
    });
};

exports.getTaskByProjectId = async (req, res) => {

  Project.findOne({
    projectId: req.params.projectId.toUpperCase()
  }, ((err, project) => {
    if (err) {
      res.status(500).send({ message: err });
      return
    }

    Task.find({
      belongTo: mongoose.Types.ObjectId(project._id)
    })
      .populate("belongTo")
      .populate("assignTo")
      .populate("userRole")
      .exec((err, task) => {
        if (err) res.status(500).send({ message: err });
        res.json(task);
      });
  })
  )
}

exports.addNewTask = async (req, res) => {
  const newTask = new Task({
    taskId: req.body.taskId,
    taskName: req.body.taskName,
    decription: req.body.decription,
    status: req.body.status,
    isDone: req.body.isDone
  });

  await newTask.save((err, newTask) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //save belongTo project
    if (req.body.belongTo) {
      Project.find(
        {
          projectId: { $in: req.body.belongTo },
        },
        (err, projects) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          newTask.belongTo = projects.map((project) => project._id);

          newTask.save((err, newTask) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            //save assign user to task
            if (req.body.assignTo) {
              User.find(
                {
                  userName: { $in: req.body.assignTo },
                },
                (err, users) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  newTask.assignTo = users.map((user) => user._id);

                  newTask.save((err, newTask) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    //save user role
                    if (req.body.userRole) {
                      Role.find(
                        {
                          roleName: { $in: req.body.userRole },
                        },
                        (err, roles) => {
                          if (err) {
                            res.status(500).send({ message: err });
                            return;
                          }

                          newTask.userRole = roles.map((role) => role._id);

                          newTask.save((err) => {
                            if (err) {
                              res.status(500).send({ message: err });
                              return;
                            }
                          });
                        }
                      );
                    }
                  });
                }
              );
            }
          });
        }
      );
    }
    res.send({ message: "Task was created successfully!" });
  });

};

exports.updateTask = async (req, res) => {
  let taskFind = new Task();

  Task.findOne(
    {
      taskId: req.params.taskId.toUpperCase(),
    },
    (err, task) => {
      if (err) res.status(500).send({ message: err });

      taskFind = task;

      taskFind.taskName = req.body.taskName;
      taskFind.status = req.body.status;
      taskFind.decription = req.body.decription;
      taskFind.isDone = req.body.isDone;

      taskFind.save((err, task) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (req.body.belongTo) {
          Project.find(
            {
              projectId: { $in: req.body.belongTo },
            },
            (err, projects) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              task.belongTo = projects.map((project) => project._id);

              task.save((err, task) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                //save assign user to task
                if (req.body.assignTo) {
                  User.find(
                    {
                      userName: { $in: req.body.assignTo },
                    },
                    (err, users) => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }

                      task.assignTo = users.map((user) => user._id);

                      task.save((err, task) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }
                        //save user role
                        if (req.body.userRole) {
                          Role.find(
                            {
                              roleName: { $in: req.body.userRole },
                            },
                            (err, roles) => {
                              if (err) {
                                res.status(500).send({ message: err });
                                return;
                              }

                              task.userRole = roles.map((role) => role._id);

                              task.save((err) => {
                                if (err) {
                                  res.status(500).send({ message: err });
                                  return;
                                }

                                res.send({ message: "Task was updated successfully!" });
                              });
                            }
                          );
                        }
                      });
                    }
                  );
                }
              });
            }
          );
        }
      });
    }
  );
};

exports.deleteTask = async (req, res) => {
  Task.deleteOne({
    taskId: req.params.taskId.toUpperCase()
  })
    .then(() => {
      res.json("Task was deleted");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
