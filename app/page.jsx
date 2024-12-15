"use client";
import { Hero } from "@/components/layouts/home-layout";
import { useUser } from "@/utils/contexts/user-context";
import Link from "next/link";
import React from "react";

const page = () => {
  const { user, loading } = useUser();

  console.log(user)
  
  return (
    <>
      <Hero />
    </>
  );
};

export default page;
