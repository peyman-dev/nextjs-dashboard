import Banner from "@/components/layouts/dashboard/products/banner";
import ProductsGrid from "@/components/layouts/dashboard/products/products-grid";
import app from "@/utils/server/api";
import React from "react";

const page = async () => {
  const response = await app.get("/products");
  const products = await response.data;

  return (
    <>
      <h1 className="text-primary mb-5 text-xl font-bold"> Products </h1>
      <Banner />

      {/* Products  */}
      <ProductsGrid products={products}/>
    </>
  );
};

export default page;
