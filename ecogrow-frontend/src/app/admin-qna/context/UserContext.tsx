"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  username: string;
  tokens: number;
  setUsername: (username: string) => void;
  setTokens: (tokens: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState("");
  const [tokens, setTokens] = useState(0);

  return (
    <UserContext.Provider value={{ username, tokens, setUsername, setTokens }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;