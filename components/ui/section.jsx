"use client";
import { verifyToken } from "@/utils/server/account-security";
import React, { useEffect } from "react";

export const signIn = async (token) => {
  await verifyToken(token).then((res) => {
    console.log(res);
  });
};

export const AuthOptions = () => {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "435154377359-l3bdbugejk59d5cl2irsuj9ovfcvqml2.apps.googleusercontent.com",
      callback: async (res) => {
        console.log(res)
        await signIn(res.credential)
      },
      ux_mode: "popup",
    });

    google.accounts.id.renderButton(document.getElementById("oauth-button"), {
      theme: "outline",
      size: "large",
      width: "100%",
    });
  }, []);

  return (
    <section className="mt-6 w-full">
      <div className='w-full bg-zinc-100 h-px flex items-center justify-center relative before:absolute before:content-["OR"] before:text-center before:text-gray-400 before:px-2 before:bg-white before:rounded-md before:top-1/2 before:-translate-y-1/2 text-xs before:left-1/2 before:-translate-x-1/2 before:z-10'></div>
      <div className="mt-4 w-full">
        <div id="oauth-button" className="mx-auto child:w-full"></div>
      </div>
    </section>
  );
};
