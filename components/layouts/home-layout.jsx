import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <section className="w-full h-screen  flex items-center justify-between child:w-1/2 container mx-auto">
      <div>
        <h1 className="text-5xl font-black">
          Welcome to Professional <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-sky-400 to-indigo-500">
            NextPro CMS
          </span>{" "}
          Project
        </h1>
        <p className="mt-4  text-zinc-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati
          illo dicta deserunt ipsum. Dolor nemo sequi sint eligendi, officiis
          modi consectetur assumenda accusantium?
        </p>

        <div className="mt-4 flex items-center gap-2.5 child-hover:bg-opacity-90 child:px-4 child:py-1.5 child:rounded-md child-focus:ring-4">
          <Link className="bg-indigo-500 text-white" href={`/auth`}>
            Get started
          </Link>
          <button className="bg-zinc-950 ring-zinc-950/50 text-white">
            Documents
          </button>
        </div>
      </div>
      <div>
        <img src="/images/hero.png" className="w-full" alt="" />
      </div>
    </section>
  );
};
