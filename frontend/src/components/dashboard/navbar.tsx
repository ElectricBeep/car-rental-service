import { Session } from "next-auth";
import Image from "next/image";

import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
  session: Session | null;
};

export const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="h-20 px-6 md:px-12 flex items-center justify-between border-b z-50 sticky top-0 bg-white dark:bg-neutral-950">
      <h3 className="hidden md:block ml-80 text-violet-500 font-semibold text-xl">{session?.user?.username}</h3>
      <div className="flex items-center gap-x-4">
        <UserButton showDashboardButton={false} session={session} />
        <ModeToggle />
      </div>
    </div>
  );
};