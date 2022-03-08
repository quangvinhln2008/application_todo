const mongoose = require("mongoose")
const { Schema } = mongoose;

const taskSchema = new Schema({
    taskId:{
        type: String,
        required: true
    },
    taskName:{
        type: String,
        required: true
    },
    decription:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    isDone:{
        type: Boolean,
        required: true,
        default: false
    },
    linkTask:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: false
        }
    ],
    belongTo:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        }
    ],
    assignTo:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    userRole:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true
        }
    ]
});

module.exports = mongoose.model("Task", taskSchema);