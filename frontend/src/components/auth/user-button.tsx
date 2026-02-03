import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { Button } from "../ui/button";
import Link from "next/link";

export const UserButton = async () => {
  const session = await getServerSession(authOptions);

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
