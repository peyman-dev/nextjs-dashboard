import Stars from "@/components/ui/product-stars";
import { units } from "@/utils/modules";
import { Heart } from "lucide-react";
import React from "react";

const Product = (props) => {
  return (
    <article
      className="p-5  bg-white rounded"
      id={units.uniqueID("product")}
    >
      <header>
        <img src={props.cover} alt="" />
      </header>
      <main className="space-y-1 mb-5 mt-1">
        <div className="flex items-center  justify-between">
          <div>
            <h3 className="text-primary font-semibold">{props.title}</h3>
            <p className="text-blue-500 font-medium text-sm">${props.price}</p>
          </div>
          <button className="size-8 text-blue-500 rounded-full bg-blue-500/5 flex items-center justify-center">
            <Heart className="size-4" />
          </button>
        </div>
        <Stars filled={4}  />
      </main>
      <footer>
        <button className="text-blue-500 hover:bg-blue-500 duration-100 hover:text-white  bg-blue-500/10 rounded text-xs px-4 py-2 font-semibold">
          Manage Product
        </button>
      </footer>
    </article>
  );
};

export default Product;