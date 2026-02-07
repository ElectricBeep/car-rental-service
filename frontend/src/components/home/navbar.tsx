import { Session } from "next-auth";
import Image from "next/image";

import { UserButton } from "@/components/auth/user-button";

interface NavbarProps {
  session: Session | null;
};

export const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="h-20 px-6 md:px-12 flex items-center justify-between shadow-md z-50 sticky top-0 bg-white">
      <Image
        height={100}
        width={100}
        src="/logo.png"
        alt="logo"
      />
      <UserButton session={session} />
    </div>
  );
};