import Image from "next/image";

import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  return (
    <div className="h-20 px-12 flex items-center justify-between shadow-md">
      <Image
        height={100}
        width={100}
        src="/logo.png"
        alt="logo"
      />
      <UserButton />
    </div>
  );
};