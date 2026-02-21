import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const LogoutButton = () => {

  return (
    <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })} variant="outline" className="cursor-pointer">
      Logout
    </Button>
  );
};
