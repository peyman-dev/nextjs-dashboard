"use client";
import React, { useState } from "react";

export const FormInput = ({ placeholder, icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full h-10 border flex items-center justify-between relative my-0.5 rounded-md">
      <input
        {...props}
        placeholder={placeholder}
        className="bg-transparent outline-none absolute w-full h-full px-6 rounded-md placeholder:text-zinc-500 placeholder:text-sm"
      />
      <span className="absolute right-8 text-zinc-400">{icon}</span>
    </div>
  );
};

export const RememberMe = ({ setResult }) => {
  return (
    <div className="flex items-center text-sm accent-blue-500 select-none gap-2">
      <input
        onChange={(event) => {
          setResult(event.target.checked);
        }}
        type="checkbox"
        name="remember-me"
        id="remember-me"
      />
      <label htmlFor="remember-me">Keep me logged in</label>
    </div>
  );
};
