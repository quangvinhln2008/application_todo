const Role = require('../models/role');

exports.initial = () => {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          roleName: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
            roleName: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }