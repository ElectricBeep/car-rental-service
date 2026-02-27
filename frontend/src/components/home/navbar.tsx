import { Session } from "next-auth";
import Image from "next/image";

import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
  session: Session | null;
};

export const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="h-20 px-6 md:px-12 flex items-center justify-between shadow-md z-50 sticky top-0 bg-white dark:bg-neutral-900">
      <Image
        height={100}
        width={100}
        src="/logo.png"
        alt="logo"
      />
      <div className="flex items-center gap-x-4">
        <UserButton session={session} />
        <ModeToggle />
      </div>
    </div>
  );
};