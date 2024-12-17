"use server";

export const getProduct = async productID => {
    const product = await fetch(`http://localhost:3000/api/products/${productID}`, {
        next: {
            revalidate: 0
        }
    });
    return await product.json();
}