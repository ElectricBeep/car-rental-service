"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  if (isLoading || session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-primary-background" />
      </div>
    );
  }

  return (
    <RegisterForm />
  );
};

export default RegisterPage;