import { getProduct } from "@/app/actions";
import { ArticleLayout } from "@/components/layouts/article-layout";
import React from "react";

const page = async ({ params }) => {
  const { productID } = await params;
  const product = await getProduct(productID)


  return (
    <ArticleLayout data={product}/>
  );
};

export default page;
