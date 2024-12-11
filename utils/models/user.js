import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
        , unique: true
    },
    password: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
        , unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
})

const UserModel = mongoose.models.User || mongoose.model("User", Schema)

export default UserModel