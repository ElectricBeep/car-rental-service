"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "@/lib/validations";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (result?.error) {
        toast("Invalid username or password!");
      }
    } catch (error: any) {
      toast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper headerLabel="Welcome back">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      type="text"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset">
                      Forgot password?
                    </Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-400 text-white cursor-pointer"
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

