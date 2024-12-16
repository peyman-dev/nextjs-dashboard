import mongoose from "mongoose"

const Schema = mongoose.Schema({
    title: {
        type: String,
       
    },
    price: {
        type: Number,
       
    },
    cover: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    categories: {
        type: [String],
       
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

const ProductModel = mongoose.models.Product || mongoose.model("Product", Schema)

export default ProductModel
