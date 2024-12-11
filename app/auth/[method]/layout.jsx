import React from "react";

const layout = ({ children }) => {
  return (
    <main className="w-full bg-sky-50 h-screen flex items-center justify-center flex-col">
      <section className="p-6 rounded-lg text-sm  bg-white max-w-[500px]">
        {children}
      </section>
    </main>
  );
};

export default layout;
