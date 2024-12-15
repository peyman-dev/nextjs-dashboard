"use client";
import { useUser } from "@/utils/contexts/user-context";
import React from "react";

export const DashboardName = () => {
  const { user } = useUser();

  return (
    <div className="">
      Welcome back <strong>{user.fullName} 🤞</strong>
    </div>
  );
};
