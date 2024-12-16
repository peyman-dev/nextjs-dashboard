"use client";
import classNames from "classnames";
import { LayoutGrid, Table } from "lucide-react";
import React, { useState } from "react";

const GridLayout = ({ onViewChange }) => {
  const [view, setView] = useState("grid");
  const active = classNames("bg-blue-500/10 text-blue-500 ");

  const handleChange = (e) => {
    const type = e.currentTarget.dataset.type;
    setView(type);
    onViewChange(type);

    if (e.target.tagName === "svg") {
      return;
    }
  };

  return (
    <div className="my-5 child:size-9 child:rounded child:flex child:items-center child:justify-center flex items-center gap-2">
      <button
        data-type="grid"
        onClick={handleChange}
        className={view === "grid" ? active : null}
      >
        <LayoutGrid />
      </button>
      <button
        data-type="table"
        onClick={handleChange}
        className={view === "table" ? active : null}
      >
        <Table />
      </button>
    </div>
  );
};

export default GridLayout;
