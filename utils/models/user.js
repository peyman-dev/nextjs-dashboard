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
    picture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    }
}, {
    timestamps: true
})

const UserModel = mongoose.models.User || mongoose.model("User", Schema)

Schema.virtual("notifications", {
    ref: "Notification",
    localField: "_id",
    foreignField: "user"
}
)

export default UserModel