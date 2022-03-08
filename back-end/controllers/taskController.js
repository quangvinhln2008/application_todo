const Project = require("../models/project");
const User = require("../models/user");
const Task = require("../models/task");
const Role = require("../models/role");

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

exports.addNewProject = async (req, res) => {
  const newProject = new Project({
    projectId: req.body.projectId,
    projectName: req.body.projectName,
    status: req.body.status,
  });

  await newProject.save((err, newProject) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.createdBy) {
      User.find(
        {
          userName: { $in: req.body.createdBy },
        },
        (err, users) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          newProject.createdBy = users.map((user) => user._id);

          newProject.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Project was created successfully!" });
          });
        }
      );
    }
  });
};

exports.updateProject = async (req, res) => {
  let projectFind = new Project();

  Project.findOne(
    {
      projectId: req.params.projectId,
    },
    (err, project) => {
      if (err) res.status(500).send({ message: err });

      projectFind = project;

      projectFind.projectName = req.body.projectName;
      projectFind.status = req.body.status;

      projectFind.save((err, project) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (req.body.createdBy) {
          User.find(
            {
              userName: { $in: req.body.createdBy },
            },
            (err, users) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              project.createdBy = users.map((user) => user._id);

              project.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                res.send({ message: "Project was updated successfully!" });
              });
            }
          );
        }
      });
    }
  );
  // .then((project) => {
  //   project.projectName = req.body.projectName;
  //   project.status = req.body.status;

  //   project.save((err, project) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }

  //     if (req.body.createdBy) {
  //       User.find(
  //         {
  //           userName: { $in: req.body.createdBy },
  //         },
  //         (err, users) => {
  //           if (err) {
  //             res.status(500).send({ message: err });
  //             return;
  //           }

  //           project.createdBy = users.map((user) => user._id);

  //           project.save((err) => {
  //             if (err) {
  //               res.status(500).send({ message: err });
  //               return;
  //             }

  //             res.send({ message: "Project was updated successfully!" });
  //           });
  //         }
  //       );
  //     }
  //   })
  // });
};

exports.deleteProject = async (req, res) => {
  Project.deleteOne({ projectId: req.params.projectId })
    .then(() => {
      res.json("Project deleted");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
