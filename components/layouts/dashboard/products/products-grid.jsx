"use client";
import React, { useContext, useState } from "react";
import GridLayout from "./grid-layout";
import Product from "./product-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Modal, ModalContext, useModal } from "@/components/ui/modal";
import ManageProduct from "./manage-product";

const ProductsGrid = ({ products }) => {
  const [viewType, setViewType] = React.useState("grid"); // grid || table
  const { closeModal, openModal, setModalContent } = useModal();
  const [target, setTarget] = useState(null);

  const manageAction = (target) => {
    setModalContent(<ManageProduct product={target} />);

    setTarget(target);
    openModal();
  };

  if (products && products.length) {
    return (
      <>
        <section className="mt-5">
          <div className="w-full flex items-center justify-between">
            <GridLayout onViewChange={setViewType} />
            <Link
              href={"products/create"}
              className="bg-blue-500 duration-100 text-white rounded text-xs px-4 py-2 font-semibold"
            >
              Create
            </Link>
          </div>
          {viewType === "grid" ? (
            <section className="grid grid-cols-4 gap-5 w-full child:w-full">
              {products.map((product) => (
                <Product
                  manage={() => manageAction(product)}
                  {...product}
                  key={product._id}
                />
              ))}
            </section>
          ) : (
            <Table className="w-full bg-white rounded">
              <TableCaption>Manage all products from here.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="md:w-[100px]">Cover</TableHead>
                  <TableHead className="md:w-[150px]">Title</TableHead>
                  <TableHead className="md:w-[100px]">Price</TableHead>
                  <TableHead className="md:w-[100px]">Creator</TableHead>
                  <TableHead className="md:w-[150px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      <div className="h-20 flex items-center">
                        <img src={product.cover} className="size-14" alt="" />
                      </div>
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <span className="text-sm px-3 bg-yellow-100 rounded py-1 border border-yellow-200 text-yellow-500">
                        {product.creator.fullName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => manageAction(product)}
                          className="text-blue-500 min-w-max hover:bg-blue-500 duration-100 hover:text-white  bg-blue-500/10 rounded text-xs px-4 py-2 font-semibold"
                        >
                          Manage Product
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
           
            </Table>
          )}
        </section>
        <Modal />
      </>
    );
  } else {
    return (
      <div className="w-full h-40 flex items-center justify-center flex-col gap-4">
        <p className="text-zinc-500">There is no product to show ..</p>
        <Link
          href={"products/create"}
          className="bg-blue-500 duration-100 text-white rounded text-xs px-4 py-2 font-semibold"
        >
          Manage Product
        </Link>
      </div>
    );
  }
};

export default ProductsGrid;
