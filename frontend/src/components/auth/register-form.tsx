"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { registerFormSchema } from "@/lib/validations";
import { getApiClient } from "@/lib/api";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      passwordRetype: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    try {
      setIsLoading(true);

      const apiClient = await getApiClient();

      const requestData = {
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password
      };

      const response = await apiClient.users.usersCreate(requestData);

      if (response.error) {
        toast(response.error, {
          closeButton: true,
        });
      } else {
        toast(response.message || "Registration successful! Please check your email to verify your account.", {
          closeButton: true,
        });
        setHasRegistered(true);
        form.reset();
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.status === 400) {
        toast("Username already exists. Please choose a different username.", {
          closeButton: true,
        });
      } else if (error.status === 409) {
        toast("Username already exists. Please choose a different username.", {
          closeButton: true,
        });
      } else {
        toast("Registration failed. Please try again later.", {
          closeButton: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {hasRegistered ? (
        <Card className="w-100 shadow-md pb-4">
          <CardHeader>
            <CircleCheck className="size-20 text-emerald-500 mx-auto" />
          </CardHeader>
          <CardContent className="">
            <p className="text-center font-semibold">
              Registration Successfull
            </p>
            <p className="text-center text-muted-foreground text-sm mt-2">
              Please check your email to verify account.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="link"
              className="font-normal w-full"
              size="sm"
              asChild
            >
              <Link href="/login">
                Go to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <CardWrapper
          headerLabel="Create an account"
          backHref="/login"
          backLabel="Already have an account?"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
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
                  name="username"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your username"
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
                  name="email"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          type="email"
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
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          type="password"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordRetype"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm your password"
                          type="password"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-400 text-white cursor-pointer"
                disabled={isLoading}
              >
                Register
              </Button>
            </form>
          </Form>
        </CardWrapper>
      )}
    </>
  );
};