const User = require('../models/user')

exports.login = (req, res) => {
    User.find({        
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).send(err);
        })
}