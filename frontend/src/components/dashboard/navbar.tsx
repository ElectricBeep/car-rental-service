import { Session } from "next-auth";
import Image from "next/image";

import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
  session: Session | null;
};

export const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="h-20 px-6 md:px-12 justify-end flex items-center gap-x-4 border-b z-50 sticky top-0 bg-white dark:bg-neutral-950">
      <UserButton showDashboardButton={false} session={session} />
      <ModeToggle />
    </div>
  );
};