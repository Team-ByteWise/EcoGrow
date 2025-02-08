"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  username: string;
  tokens: number;
  setUsername: (username: string) => void;
  setTokens: (tokens: number) => void;
};

const AdminContext = createContext<UserContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState("");
  const [tokens, setTokens] = useState(0);

  return (
    <AdminContext.Provider value={{ username, tokens, setUsername, setTokens }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
