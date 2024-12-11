import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-4xl font-black">
        Welcome to Dashboard Project{" "}
        <span className="text-xs text-zinc-400 font-light">v0.0.1</span>
      </h1>
      <Link
        className="px-4 py-1.5 pb-2 hover:bg-opacity-90 duration-150 rounded-md bg-emerald-500 text-white shadow-inner shadow-emerald-400"
        href={"/auth"}
      >
        Login
      </Link>
    </div>
  );
};

export default page;
