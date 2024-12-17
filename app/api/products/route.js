import ProductModel from "@/utils/models/product"
import connect from "@/utils/server/connect"
import { NextResponse } from "next/server"
import fs, { unlink } from "fs/promises"
import path from "path"

export const GET = async () => {
    try {
        await connect()

        const products = await ProductModel.find({}).populate("creator").lean()

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

export const PUT = async (req) => {
    try {
        await connect();

        const formData = await req.formData();

        const title = formData.get("title");
        const description = formData.get("description");
        const user = formData.get("creator");
        const cover = formData.get("cover");
        const price = formData.get("price");
        const productID = formData.get("id");

        // Find the product by ID
        const product = await ProductModel.findOne({ _id: productID });

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }


    
        console.log(description)
        
        
        // Remove the current cover if it exists
        if (product.cover !== cover) {
            const oldCoverPath = path.join(
                process.cwd(),
                "public",
                product.cover.replace("http://localhost:3000/", "")
            );

            try {
                await fs.unlink(oldCoverPath); // Delete the old file
            } catch (err) {
                console.error("Failed to delete old cover:", err.message);
            }
        }

        let newCoverUrl = product.cover; // Default to current cover URL

        // If a new cover is provided, upload and update it
        if (cover !== product.cover) {
            const buffer = Buffer.from(await cover.arrayBuffer());
            const filename = Date.now() + cover.name;
            const uploadsDir = path.join(process.cwd(), "public/uploads");
            const newCoverPath = path.join(uploadsDir, filename);

            // Ensure the 'uploads' directory exists
            await fs.mkdir(uploadsDir, { recursive: true });

            // Write the new file to the 'uploads' directory
            await fs.writeFile(newCoverPath, buffer);

            newCoverUrl = `http://localhost:3000/uploads/${filename}`;
        }

        // Update the product in the database using `findOneAndUpdate`
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: productID },
            {
                title: title || product.title,
                description: description || product.description,
                price: price ? Number(price) : product.price,
                cover: newCoverUrl,
                creator: user || product.creator,
            },
            { new: true } // Return the updated document
        );

        return NextResponse.json(
            { message: "Product updated successfully", product: updatedProduct },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
