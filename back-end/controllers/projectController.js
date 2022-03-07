const Project = require("../models/project");
const User = require("../models/user");
const Role = require("../models/role");

exports.getAllProject = async (req, res) => {
  await Project.find({})
    .populate("createdBy")
    .exec((err, project) => {
      if (err) res.status(500).send(err);
      res.json(project);
    });
};

// exports.getUserById = async (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// };

exports.addNewProject = async (req, res) => {
  const newProject = new Project({
    projectId: req.body.projectId,
    projectName: req.body.projectName,
    status: req.body.status
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
  await Project.find({
    projectId: req.params.projectId
  }, (err, project) => {
    if (err) res.status(500).send({ message: err });

    project.projectName = req.body.projectName;
    project.status = req.body.status;
    
    project.save((err, project) => {
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
    })
  })
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
