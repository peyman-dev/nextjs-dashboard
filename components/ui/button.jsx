import classNames from "classnames";
import { Loader } from "lucide-react";
import React from "react";

export const FormButton = ({ pending }) => {
  const cn = classNames(
    "w-full flex items-center justify-center focus:ring-4 hover:bg-opacity-90 gap-2 h-10 rounded-md bg-blue-500 text-white",
    {
      "!bg-blue-300 cursor-not-allowed": pending,
    }
  );

  return (
    <button disabled={pending} className={cn}>
      {pending ? <Loader className="animate-spin size-4"/> : "Continue"}
    </button>
  );
};
