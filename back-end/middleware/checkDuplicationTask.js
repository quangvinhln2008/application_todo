const Task = require("../models/task")

exports.checkDuplicateTaskId = (req, res, next) => {
    // User name
    Task.findOne({
      TaskId: req.body.TaskId,
    }).exec((err, task) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (task) {
        res.status(400).send({ message: "Failed! Task ID is already in use!" });
        return;
      }
      next();
    });
  }