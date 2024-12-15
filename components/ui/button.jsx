import { useUser } from "@/utils/contexts/user-context";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import { Bell, ChevronDown, CircleXIcon, Loader } from "lucide-react";
import React, { useState } from "react";

export const FormButton = ({ pending }) => {
  const cn = classNames(
    "w-full flex items-center justify-center focus:ring-4 hover:bg-opacity-90 gap-2 h-10 rounded-md bg-blue-500 text-white",
    {
      "!bg-blue-300 cursor-not-allowed": pending,
    }
  );

  return (
    <button disabled={pending} className={cn}>
      {pending ? <Loader className="animate-spin size-4" /> : "Continue"}
    </button>
  );
};

export const ClientLanguage = () => {
  const [lang, setLang] = useState("EN");

  return (
    <div>
      <button className="flex px-3 py-2 rounded-md hover:bg-zinc-50 items-center gap-2">
        <div className="flex items-center gap-2">
          {/* English flag image */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/197/197374.png"
            className="size-4"
            alt=""
          />
          <span className="font-semibold text-sm">Eng (UK)</span>
        </div>
        <ChevronDown className="size-3 text-zinc-400" />
      </button>
    </div>
  );
};

export const Notifications = () => {
  const [notifications, setNotifications] = useState([{}]);
  const [menuShow, setMenuShow] = useState(false);

  const NewNotificationesBadge = () => {
    if (notifications.length > 0) {
      return (
        <div className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-white"></div>
      );
    }
  };

  return (
    <div className="relative size-10 duration-150 hover:bg-yellow-400/20 focus-within:ring-2 ring-yellow-400/40 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
      <NewNotificationesBadge />
      <Tippy content={`${notifications.length} notifications`}>
        <button
          onClick={() => setMenuShow(!menuShow)}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <Bell className="size-5" />
        </button>
      </Tippy>
      <div
        hidden={!menuShow}
        className="absolute w-[240px] bg-white border duration-100 right-0 p-2.5 rounded-lg text-black top-[110%]"
      >
        <div className="flex text-xs text-zinc-500 items-center justify-between">
          <span>{notifications.length} new notifications</span>
          <button onClick={() => setMenuShow(!menuShow)}>
            <CircleXIcon className="size-4" />
          </button>
        </div>
        <div className="my-3">
          {notifications.map((notif) => (
            <div className="h-12  flex text-sm items-center bg-zinc-100 rounded-lg px-4">
              :)
            </div>
          ))}
        </div>
        <div>
          <button className="text-xs bg-blue-600 text-white py-1.5 px-3 rounded-lg">
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export const Profile = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <div>
      <button className="size-10 rounded-full bg-cover bg-center overflow-hidden" style={{
        backgroundImage: `url(${user?.picture})`
      }}></button>
    </div>
  );
};
