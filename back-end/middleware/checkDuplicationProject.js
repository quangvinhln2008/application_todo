const Project = require("../models/project")

exports.checkDuplicateProjectId = (req, res, next) => {
    // User name
    Project.findOne({
      projectId: req.body.projectId,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Project ID is already in use!" });
        return;
      }
      next();
    });
  }