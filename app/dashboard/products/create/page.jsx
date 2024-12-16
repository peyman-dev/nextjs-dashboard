"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HashtagsInput, Input } from "@/components/ui/input";
import TextEditor from "@/components/ui/text-editor";
import { useUser } from "@/utils/contexts/user-context";
import app from "@/utils/server/api";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { user } = useUser();
  const [description, setDescription] = useState("");
  const [cats, setCats] = useState([""]);
  const [price, setPrice] = useState(1);
  const [title, setTitle] = useState("");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const createTheProduct = async () => {
    const formData = new FormData();
    formData.append("cover", file);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("price", Number(price));
    formData.append("user", user._id);

    // Serialize the categories array as a JSON string
    formData.append("categories", JSON.stringify(cats));

    try {
      const response = await app.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Explicitly set the content type
        },
      });
      const data = response.data;

      if (response.status == 201) {
        toast.success("Product created successfully !", {
          onClose: () => {
            redirect("/dashboard/products");
          },
        });
      } else {
        toast.error("Something wen't wrong", {
          onClose: () => window.location.reload(),
        });
      }
    } catch (error) {
      console.error(
        "Error creating the product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Alert variant="destructive" className="mb-5 bg-red-500/5 rounded">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Careful.</AlertTitle>
        <AlertDescription>
          This is the <strong>NextPRO Beta v0.0.1 </strong> platform, It Might
          has some bugs.
        </AlertDescription>
      </Alert>
      <h1 className="text-primary mb-5 text-xl font-bold">Create an Product</h1>
      <section className="p-5 w-full rounded bg-white">
        <section className="grid grid-cols-2 gap-10 mb-10">
          <Input
            placeholder="Product title .."
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Product Price .."
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
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
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex-grow px-3 truncate">
              {file ? file.name : "No file chosen"}
            </div>
            {previewUrl && (
              <div className="w-10 h-10 flex-shrink-0">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <HashtagsInput onChange={setCats} />
        </section>
        <TextEditor value={description} onChange={setDescription} />

        <button
          onClick={createTheProduct}
          className="px-4 rounded bg-blue-500 py-2 text-white mt-5"
        >
          Create and save
        </button>
      </section>
    </>
  );
};

export default page;
