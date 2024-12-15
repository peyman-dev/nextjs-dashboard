import React from "react";
import SaleCard from "./sale-card";
import { ShoppingBag } from "lucide-react";
import { totalSales } from "./data";

export const TotalSales = () => {


  return (
    <section className="min-w-[60%]">
      <div>
        <h2 className="text-primary font-semibold">Today’s Sales</h2>
        <p className="text-secondary text-xs mt-1">Sales Summery</p>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-4">
        {totalSales.map((card, index) => (
          <SaleCard title={card.name} value={card.value} key={index} bgClass={card.color} Icon={card.icon} />
        ))}
      </div>
    </section>
  );
};

export default TotalSales;
