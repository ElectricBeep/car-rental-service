"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import { useUserRole } from "@/hooks/useUserRole";

export default function RoleProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAdmin, isManager, isUser } = useUserRole();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAdmin && !pathname.startsWith("/admin")) {
      router.replace("/admin");
    } else if (isManager && !pathname.startsWith("/manager")) {
      router.replace("/manager");
    } else if (isUser && !pathname.startsWith("/user")) {
      router.replace("/user");
    }
  }, [isAdmin, isManager, isUser, pathname, router]);

  return <>{children}</>;
};
