import mongoose from "mongoose"

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isRead: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const NotificationModel = mongoose.models.Notification || mongoose.model("Notification", Schema)

export default NotificationModel
