"use client";
import { ClientLanguage, Notifications, Profile } from "@/components/ui/button";
import { WindowsLogo } from "@/components/ui/logo";
import NavLink from "@/components/ui/nav-link";
import classNames from "classnames";
import {
  Home,
  LogOut,
  MessageSquareIcon,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  const active = classNames(
    "flex items-center gap-2 h-12 w-full  bg-indigo-500 !text-white"
  );

  return (
    <aside className="w-[300px] bg-white h-screen p-4">
      <header>
        <WindowsLogo />
      </header>
      <main className="mt-10 space-y-2">
        <NavLink
          href="/dashboard"
          className="flex items-center gap-3 h-12 w-full rounded px-4 text-[#737791]"
          exact={true}
          activeClassName={active}
        >
          <Home className="size-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          href="/dashboard/products"
          exact={true}
          className="flex items-center gap-3 h-12 w-full rounded px-4 text-[#737791]"
          activeClassName={active}
        >
          <Home className="size-5" />
          <span>Products</span>
        </NavLink>
        <NavLink
          href="/dashboard/orders"
          exact={true}
          className="flex items-center gap-3 h-12 w-full rounded px-4 text-[#737791]"
          activeClassName={active}
        >
          <ShoppingBag className="size-5" />
          <span>Orders</span>
        </NavLink>
        <NavLink
          href="/dashboard/users"
          exact={true}
          className="flex items-center gap-3 h-12 w-full rounded px-4 text-[#737791]"
          activeClassName={active}
        >
          <Users className="size-5" />
          <span>Users</span>
        </NavLink>
        <NavLink
          href="/dashboard/tickets"
          exact={true}
          className="flex items-center gap-3 h-12 w-full rounded px-4 text-[#737791]"
          activeClassName={active}
        >
          <MessageSquareIcon className="size-5" />
          <span>Tickets</span>
        </NavLink>
        <NavLink
          href="/dashboard/signout"
          exact={true}
          className="flex items-center gap-3 h-12 w-full rounded px-4 text-[#737791]"
          activeClassName={active}
        >
          <LogOut className="size-5" />
          <span>Sign out</span>
        </NavLink>
      </main>
    </aside>
  );
};

export const Header = () => {
  return (
    <div className="w-full child:flex child:items-center child:gap-4 h-20 bg-white flex items-center justify-between px-6">
      <h2 className="text font-bold">Dashboard</h2>
      <div>
        <ClientLanguage />
        <Notifications />
        <Profile />
      </div>
    </div>
  );
};




export const VisitorsInsights = () => {
  return (
    <section className="w-full">
      <h2>Visitors Insights</h2>
    </section>
  );
};

