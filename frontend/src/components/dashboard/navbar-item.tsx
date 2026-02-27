"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

interface SidebarItemProps {
  children: React.ReactNode;
  href: string;
};

export const SidebarItem = ({ children, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const onClose = useMobileSidebar((state) => state.onClose);

  const isActive =
    (pathname === "/" && href === "/") || pathname === href;

  const onClick = () => {
    onClose();
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-medium transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive && "text-violet-500 bg-violet-200/30 hover:bg-violet-200/30 hover:text-violet-400")}
    >
      {children}
      <div className={cn("ml-auto opacity-0 border-2 border-violet-500 h-full transition-all", isActive && "opacity-100")} />
    </button>
  );
};