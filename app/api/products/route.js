import ProductModel from "@/utils/models/product"
import connect from "@/utils/server/connect"
import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export const GET = async () => {
    try {
        await connect()

        const products = await ProductModel.find({})

        return NextResponse.json(products || [], { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

}


export const POST = async (request) => {
    try {
        await connect();
        const data = await request.formData();
        const title = data.get("title");
        const description = data.get("description");
        const price = data.get("price");
        const categories = JSON.parse(data.get("categories")); // Parse JSON string back into an array
        const user = data.get("user");
        const cover = data.get("cover");

        // Handle file upload
        const buffer = Buffer.from(await cover.arrayBuffer());
        const filename = Date.now() + cover.name;
        const uploadsDir = path.join(process.cwd(), "public/uploads");
        const imgPath = path.join(uploadsDir, filename);

        // Ensure the 'uploads' directory exists
        await fs.mkdir(uploadsDir, { recursive: true });

        // Write the file to the 'uploads' directory
        await fs.writeFile(imgPath, buffer);

        // Save product to the database
        const product = await ProductModel.create({
            title,
            price: Number(price),
            cover: `http://localhost:3000/uploads/${filename}`,
            description,
            categories,
            creator: user,
        });

        if (!product) {
            return NextResponse.json({ error: "Product creation failed" }, { status: 500 });
        }

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}