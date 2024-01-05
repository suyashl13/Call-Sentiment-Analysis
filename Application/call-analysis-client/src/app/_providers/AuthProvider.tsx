"use client";

import { User } from "@/types/user.types";
import React from "react";

interface UserContextType {
  user: User | null;
  status: "unauthenticated" | "loading" | "authenticated";
}

const UserContext = React.createContext<UserContextType>({
  user: null,
  status: "loading",
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState<
    "unauthenticated" | "loading" | "authenticated"
  >("loading");

  const fetchUser = async () => {
    let response: Promise<Response> | any;
    try {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URI}/auth/profile`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setStatus("unauthenticated");
    }

    if (response.ok) {
      try {
        const user = await response.json();
        setUser(user);
        setStatus("authenticated");
      } catch (error) {
        setStatus("unauthenticated");
      }
    } else {
      setStatus("unauthenticated");
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, status }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(UserContext);
}
