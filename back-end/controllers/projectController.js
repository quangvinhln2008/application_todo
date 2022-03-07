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
    status: req.body.status,
    createdBy: req.body.createdBy
  });
console.log(newProject)

  await newProject.save((err) => {
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

            res.send({ message: "Project was registered successfully!" });
          });
        }
      );
    }
  });
};

// exports.updateUser = async (req, res) => {
//   User.findById(req.params.id).then((user) => {
//     user.userName = req.body.userName;
//     user.password = req.body.password;
//     user.email = req.body.email;

//     user
//       .save()
//       .then(() => {
//         res.json("Update complete");
//       })
//       .catch((err) => {
//         res.status(500).send(err);
//       });
//   });
// };

// exports.deleteUser = async (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.json("User deleted");
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// };
