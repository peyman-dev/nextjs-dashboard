"use client";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/ui/modal";
import TextEditor from "@/components/ui/text-editor";
import app from "@/utils/server/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageProduct = ({ product }) => {
  const context = useModal();
  const [desc, setDesc] = useState(product.description);
  const [title, setTitle] = useState(product.title || "");
  const [price, setPrice] = useState(product.price || "");
  const [cover, setCover] = useState(product.cover || "");
  const [categories, setCategories] = useState(product.categories || []);


  useEffect(() => {}, []);

  const submitted = async () => {
    const formData = new FormData();
    

    const isEmptyDesc = desc == "<p></p>";
    

    formData.append("title", title);
    formData.append("description", isEmptyDesc ? product.description : desc);
    formData.append("price", price);
    formData.append("cover", cover);
    formData.append("id", product._id);

    const res = await fetch("/api/products", {
      method: "PUT",
      body: formData,
      // No need to manually set Content-Type
    });

    const result = await res.json();

    if (res.ok) {
      return toast.success(result.message, {
        onClose: () => {
          window.location.reload();
        },
      });
    } else {
      return toast.error(result.message, {
        onClose: () => {},
      });
    }
  };

  return (
    <div className="pb-28 scroll-m-0">
      <h4 className="text-lg font-bold">Edit product</h4>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <div>
          <label
            className="text-sm mb-1 text-zinc-500 after:content-[':']"
            htmlFor="product-title"
          >
            Title
          </label>
          <Input
            id="product-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            className="text-sm mb-1 text-zinc-500 after:content-[':']"
            htmlFor="product-price"
          >
            Price
          </label>
          <Input
            id="product-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>
      </div>
      <div className="mt-5">
        <span className="text-sm mb-1 text-zinc-500 after:content-[':']">
          Cover
        </span>
        <div className="flex text-sm pr-4 items-center h-10 bg-white border rounded-md overflow-hidden">
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center h-full px-4 bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            Choose File
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setCover(e.target.files[0])}
          />
          <div className="flex-grow px-3 truncate">
            {cover ? cover.name : "No file chosen"}
          </div>
        </div>
        <button
          onClick={() => {
            context.setModalContent(<ShowImage product={product} />);
            context.openModal();
          }}
          className="px-5 py-2 rounded hover:bg-opacity-90 focus-within:ring-4 text-sm mt-4 bg-blue-500 text-white"
        >
          Show cover
        </button>
      </div>
      <div className="mt-5">
        <span className="text-sm mb-1 text-zinc-500 after:content-[':']">
          Description
        </span>
        <TextEditor value={desc} onChange={setDesc} />
      </div>
      <button
        className="float-end mt-10 bg-blue-100 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white focus-within:ring-4"
        onClick={submitted}
      >
        Save changes
      </button>
    </div>
  );
};

const ShowImage = ({ product }) => {
  const context = useModal();
  return (
    <div className="flex flex-col overflow-hidden items-center w-full h-[90%] justify-center">
      <div>
        <img
          src={product.cover}
          alt="cover"
          className="w-96 h-96 object-cover rounded-lg"
        />
        <caption className="text-center min-w-max mx-auto w-full">
          {product.title}
        </caption>
      </div>
      <button
        onClick={() => {
          context.setModalContent(<ManageProduct product={product} />);
        }}
        className="float-end mt-4 px-4 py-2 rounded bg-blue-500 text-white focus-within:ring-4"
      >
        Back
      </button>
    </div>
  );
};

export default ManageProduct;
