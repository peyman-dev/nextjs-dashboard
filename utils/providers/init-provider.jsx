"use client";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

const InitProvider = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        transition={Bounce}
        draggable
        bodyClassName={"!font-[Poppins] !text-zinc-900"}
        pauseOnHover
      />
      {children}
    </>
  );
};

export default InitProvider;
