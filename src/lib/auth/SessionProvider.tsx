"use client";

import { createContext } from "react";
import { Session } from "./types";

export const SessionContext = createContext<Session | null | undefined>(
  undefined
);

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
