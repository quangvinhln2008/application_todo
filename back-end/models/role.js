import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({
    roleName:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Role", roleSchema);