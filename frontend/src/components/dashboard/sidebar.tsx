"use client";

import Image from "next/image";
import Link from "next/link";
import { CaseUpper, User } from "lucide-react";

import { useUserRole } from "@/hooks/use-user-role";
import { SidebarItem } from "./navbar-item";

export const Sidebar = () => {
  const { isAdmin, isManager, isUser } = useUserRole();

  const navItems = [
    {
      label: "Users",
      href: "/admin/users",
      icon: <User size={22} />,
    },
    {
      label: "Manufacturers",
      href: "/admin/brands",
      icon: <CaseUpper size={22} />,
    },
  ];

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto">
      <div className="px-4 flex justify-start">
        <Link href="/" className="text-violet-500 font-bold flex items-center gap-x-4">
          <Image
            height={80}
            width={80}
            src="/logo.png"
            loading="eager"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        {navItems.map((item) => (
          <SidebarItem key={item.label} href={item.href}>
            <div className="flex items-center gap-x-2 p-4">
              {item.icon}
              {item.label}
            </div>
          </SidebarItem>
        ))}
      </div>
    </div>
  );
};
