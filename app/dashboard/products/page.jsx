import Banner from "@/components/layouts/dashboard/products/banner";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="text-primary text-xl font-bold"> Products </h1>
      <section className="mt-10">
        <Banner />
      </section>
    </>
  );
};

export default page;
