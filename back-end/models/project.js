const mongoose = require("mongoose")
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectId:{
        type: String,
        required: true
    },
    projectName:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    createdBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ]
});

module.exports = mongoose.model("Project", projectSchema);