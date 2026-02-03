"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.status === 200) {
        toast.success("Logged out successfully");
        router.replace("/auth/login");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};
