"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const LogoutPage = () => {
  const router = useRouter();

  // TODO use states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.status === 200) {
      } else {
        toast.error("Uh oh! Something went wrong.");
        setError("Something went wrong!");
      }
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <></>;
};

export default LogoutPage;
