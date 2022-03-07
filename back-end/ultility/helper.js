const md5 = require("md5");

//function hashPassword
exports.hashPassword = (password) => {
    return md5(password)
}
