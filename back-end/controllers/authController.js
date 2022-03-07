
const User = require('../models/user')
const Role = require('../models/role');

const helper = require('../ultility/helper');
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    User.find({        
        email: req.body.email,
        password: helper.hashPassword(req.body.password)
    })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).send(err);
        })
}

exports.signup = (req, res) => {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: helper.hashPassword(req.body.password)
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (req.body.roles) {
        Role.find(
          {
            roleName: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ roleName: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  };
  
  exports.signin = (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = helper.hashPassword(req.body.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 86400 // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].roleName.toUpperCase());
        }

        res.status(200).send({
          id: user._id,
          userName: user.userName,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
  };