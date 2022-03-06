const { response } = require("express");
const User = require("../models/user");

exports.getAllUser = async (req, res) => {
    const users = await User.find({});
    try {
        res.json(users)
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getUserById = async (req, res) =>{
    User.findById(req.params.id)
        .then(user =>{
            res.json(user)
        })
        .catch(err => {
            res.status(500).send(err);
        });
}
exports.addNewUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.json(newUser)
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateUser = async (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.userName = req.body.userName;
            user.password = req.body.password;
            user.email = req.body.email;

            user.save()
                .then(() => {
                    res.json('Update complete');
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
}

exports.deleteUser = async (req, res) =>{
    User.findByIdAndDelete(req.params.id)
    .then(() =>{
        res.json('User deleted')
    })
    .catch(err => {
        res.status(500).send(err);
    });
}