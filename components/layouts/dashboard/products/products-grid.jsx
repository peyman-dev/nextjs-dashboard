"use client";
import React, { useContext } from "react";
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

const ProductsGrid = ({ products }) => {
  const [viewType, setViewType] = React.useState("grid"); // grid || table
  const {closeModal, openModal} = useModal()


  if (products && products.length) {
    return (
      <>
        <section className="mt-5">
          <GridLayout onViewChange={setViewType} />
          {viewType === "grid" ? (
            <section className="grid grid-cols-4 gap-5 w-full child:w-full">
              {console.log(products)}
              {products.map((product) => (
                <Product {...product} key={product._id} />
              ))}
            </section>
          ) : (
            <Table className="w-full bg-white rounded">
              <TableCaption>Manage all products from here.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="md:w-[200px]">Cover</TableHead>
                  <TableHead className="md:w-[300px]">Title</TableHead>
                  <TableHead className="md:w-[100px]">Price</TableHead>
                  <TableHead className="md:w-[150px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.product}>
                    <TableCell className="font-medium">
                      <div className="h-20 flex items-center">
                        <img src={product.cover} className="size-14" alt="" />
                      </div>
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <button onClick={openModal} className="text-blue-500 min-w-max hover:bg-blue-500 duration-100 hover:text-white  bg-blue-500/10 rounded text-xs px-4 py-2 font-semibold">
                          Manage Product
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </section>
        <Modal  />
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
