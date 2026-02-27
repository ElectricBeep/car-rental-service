"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout-button";

interface UserButtonProps {
  session: Session | null;
  showDashboardButton?: boolean;
};

export const UserButton = ({ session, showDashboardButton = true }: UserButtonProps) => {
  if (!session) {
    return (
      <div className="flex items-center gap-x-4">
        <Button asChild className="bg-primary-background hover:bg-primary-background-hover text-white hover:text-white transition">
          <Link href="/login">
            Sign In
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register" className="">
            Sign Up
          </Link>
        </Button>
      </div>
    );
  }

  const { isAdmin } = useUserRole();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (isAdmin) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      {showDashboardButton && (
        <Button
          onClick={handleDashboardClick}
          className="bg-primary-background hover:bg-primary-background-hover text-white hover:text-white transition cursor-pointer"
        >
          Dashboard
        </Button>
      )}
      <LogoutButton />
    </div>
  );
};
