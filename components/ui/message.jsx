import { CircleAlert } from "lucide-react";

export const Error = ({ message }) => {
  if (message) {
    return (
      <div
        className="bg-red-100  text-xs border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <div className="flex items-center mb-1 gap-2">
          <CircleAlert className="size-4" />
          <strong className="font-bold">Error!</strong>
        </div>
        <span className="block sm:inline">{message}</span>
      </div>
    );
  }
};
