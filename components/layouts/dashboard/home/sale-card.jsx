import React from 'react'

const SaleCard = ({ bgClass = "bg-gray-200", Icon, title, value }) => {
  return (
    <article
      className={`w-full p-4 space-y-2  ${bgClass} rounded bg-opacity-30`}
    >
      <header>
        <span
          className={`size-10 flex rounded-full items-center justify-center ${bgClass}`}
        >
          <Icon className="size-5 text-white" />
        </span>
      </header>
      <main>
        <p className="text-xl font-semibold text-[#151D48]">{value}</p>
        <p className="text-sm mt-2 font-medium text-[#414F62]">{title}</p>
      </main>
      <footer>
        <span className="text-xs text-[#4079ED]">+8% from yesterday</span>
      </footer>
    </article>
  );
};


export default SaleCard