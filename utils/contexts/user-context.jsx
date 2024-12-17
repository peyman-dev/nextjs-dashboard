// context/UserContext.js
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { units } from "@/utils/modules";
import app from "@/utils/server/api";
import Loading from "@/components/ui/loading";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await app.get("/auth/me");
        const result = await response.data;
        setUser(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);



  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
