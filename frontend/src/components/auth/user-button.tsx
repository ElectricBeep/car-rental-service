
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";

interface UserButtonProps {
  session: Session | null;
};

export const UserButton = async ({ session }: UserButtonProps) => {
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

  return <Button asChild className="bg-primary-background hover:bg-primary-background-hover text-white hover:text-white transition">
    <Link href="/dashboard">
      Dashboard
    </Link>
  </Button>;
};
