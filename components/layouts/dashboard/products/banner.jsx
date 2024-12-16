import React from "react";

const Banner = () => {
  return (
    <div className="w-full text-white rounded p-20 bg-blue-500">
      <p className="text-4xl font-bold leading-[42px]">
        Enjoy free home <br />
        delivery in this summer
      </p>
      <p className="mt-4 text-white/90 text-sm">Designer Dresses - Pick from trendy Designer Dress.</p>
      <button className="mt-6 px-6 py-2.5 hover:bg-opacity-95 duration-100 active:scale-[0.95] rounded bg-orange-400">
        Get started
      </button>
    </div>
  );
};

export default Banner;
