import { Header, Sidebar } from "@/components/layouts/dashboard/layout";
import { DashboardName } from "@/components/ui/card";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <main className="flex bg-zinc-100/70 w-full min-h-screen justify-between">
      <Sidebar />
      <section className="w-full">
        <Header />
        <section className="m-10">
        {children}
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
