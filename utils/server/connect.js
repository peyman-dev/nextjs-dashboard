import mongoose from "mongoose";

export default async function () {
    try {
        if (mongoose.connections[0].readyState) {
            return;
        }

        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Connected to MongoDB")
        })

    } catch (error) {
        console.log(error.message)

    }
}