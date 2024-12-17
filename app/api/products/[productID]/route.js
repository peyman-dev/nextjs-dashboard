import ProductModel from "@/utils/models/product"
import connect from "@/utils/server/connect"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        connect()
        const productID = params.productID


        if (!productID) {
            return NextResponse.json({ message: "Please provide a productID" }, { status: 400 })
        }

        const product = await ProductModel.findById(productID).populate("creator", "-password").lean()

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}