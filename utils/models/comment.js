import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    isVisible: {
        type: Boolean,
        default: false, 
    }
}, {
    timestamps: true
})

const CommentModel = mongoose.models.Comment || mongoose.model("Comment", Schema)

export default CommentModel