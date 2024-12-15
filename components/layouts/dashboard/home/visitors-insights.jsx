import { LineChart } from "@/components/ui/chart";
import React from "react";

const VisitorsInsights = () => {
  return (
    <article className="w-full">
      <div>
        <h2 className="text-[#05004E] font-semibold">Visitors Insights</h2>
      </div>
      <LineChart />
    </article>
  );
};

export default VisitorsInsights;
