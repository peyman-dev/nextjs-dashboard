import TotalSales from "@/components/layouts/dashboard/home/total-sales";
import VisitorsInsights from "@/components/layouts/dashboard/home/visitors-insights";
import classNames from "classnames";
import React from "react";

const page = () => {
  const section = classNames(
    "flex child:shadow lg:flex-row flex-col gap-5 child:p-5 child:bg-white child:rounded"
  );

  return (
    <>
      <section className={section}>
        <TotalSales />
        <VisitorsInsights />
      </section>
    </>
  );
};

export default page;
