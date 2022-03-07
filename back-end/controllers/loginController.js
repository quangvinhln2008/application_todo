const User = require('../models/user')
const helper = require('../ultility/helper')

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