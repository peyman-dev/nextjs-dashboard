"use client";

import { objectUnits, units } from "@/utils/modules";
import { useForm } from "react-hook-form";
import { RememberMe } from "./input";
import { AtSign, Hash, Mail, User } from "lucide-react";
import { FormButton } from "./button";
import React, { Suspense, useState } from "react";
import { loginSchema, registerSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "./message";
import { AuthOptions } from "./section";
import Link from "next/link";
import app from "@/utils/server/api";
import { toast } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idenitifier: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputs = objectUnits.getArray(getValues());

  const submitted = async (data) => {
    try {
      const res = await app.post("/auth/login", data);
      console.log(res);
    } catch (error) {}
  };

  return (
    <Suspense fallback={<div> Please wait ...</div>}>
      <form className="w-[340px]" onSubmit={handleSubmit(submitted)}>
        <h1 className="text-xl font-extrabold">Sign in</h1>
        <p className="text-zinc-500 font-light text-sm mt-1">
          Please login to continue to your account.
        </p>
        <section className="mt-4 space-y-3">
          {inputs.map((input) => (
            <React.Fragment key={input}>
              <div className="w-full h-10 border flex items-center justify-between relative my-0.5 rounded-md">
                <input
                  autoComplete="Nothing"
                  placeholder={units.capitilize(input)}
                  className="bg-transparent outline-none absolute w-full h-full px-6 rounded-md placeholder:text-zinc-500 placeholder:text-sm"
                  {...register(input)}
                  type={units.conditional(
                    input == "password",
                    "password",
                    "text"
                  )}
                />
                <span className="absolute right-8 text-zinc-400">
                  {units.conditional(
                    input == "password",
                    <Hash className="size-4" />,
                    <AtSign className="size-4" />
                  )}
                </span>
              </div>
              <Error message={errors[input]?.message} />
            </React.Fragment>
          ))}
          <RememberMe setResult={setRememberMe} />
        </section>
        <div className="mt-4">
          <FormButton pending={isLoading} />
        </div>

        <AuthOptions />
        <div className="flex justify-center items-center mt-4 gap-1 text-xs text-slate-500">
          <span>Already haven't an account?</span>
          <Link href="/auth/register" className="text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </Suspense>
  );
};

export const Register = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitted = async (data) => {
    const res = await app.post("/auth/register", data);
    const result = await res.data;

    if (res.status == 201) {
      return toast.success(result.message, {});
    } else {
      return toast.error(result.message);
    }
  };

  const inputs = objectUnits.getArray(getValues());

  return (
    <Suspense fallback={<div> Please wait ...</div>}>
      <form className="w-[340px]" onSubmit={handleSubmit(submitted)}>
        <h1 className="text-xl font-extrabold">Sign in</h1>
        <p className="text-zinc-500 font-light text-sm mt-1">
          Please login to continue to your account.
        </p>
        <section className="mt-4 space-y-3">
          {inputs.map((input) => (
            <React.Fragment key={input}>
              <div className="w-full h-10 border flex items-center justify-between relative my-0.5 rounded-md">
                <input
                  autoComplete="Nothing"
                  placeholder={units.capitilize(input)}
                  className="bg-transparent outline-none absolute w-full h-full px-6 rounded-md placeholder:text-zinc-500 placeholder:text-sm"
                  {...register(input)}
                  type={units.conditional(
                    input == "password",
                    "password",
                    "text"
                  )}
                />
                <span className="absolute right-8 text-zinc-400">
                  {input == "password" ? (
                    <Hash className="size-4" />
                  ) : input == "username" ? (
                    <AtSign className="size-4" />
                  ) : input == "email" ? (
                    <Mail className="size-4" />
                  ) : (
                    <User className="size-4" />
                  )}
                </span>
              </div>
              <Error message={errors[input]?.message} />
            </React.Fragment>
          ))}
          {/* <RememberMe setResult={setRememberMe} /> */}
        </section>
        <div className="mt-4">
          <FormButton pending={isLoading} />
        </div>

        <AuthOptions />
        <div className="flex justify-center items-center mt-4 gap-1 text-xs text-slate-500">
          <span>Already haven't an account?</span>
          <Link href="/auth/register" className="text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </Suspense>
  );
};
