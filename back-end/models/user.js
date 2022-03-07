const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    roles:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);