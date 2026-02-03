"use client";

import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
