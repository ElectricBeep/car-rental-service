"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "./card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { loginFormSchema } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { TextField } from "../forms/text-field";
import { SubmitField } from "../forms/submit-field";

type LoginFormSchema = z.infer<typeof loginFormSchema>

export const LoginForm = () => {
  const search = useSearchParams()

  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema)
  })

  const onSubmitHandler = handleSubmit((data) => {
    signIn('credentials', {
      username: data.username,
      password: data.password,
      callbackUrl: '/'
    })
  })

  return (
    <CardWrapper headerLabel="Welcome back">
      <form
        onSubmit={onSubmitHandler}
        action="/api/auth/callback/credentials"
        className="space-y-6"
      >
        <div className="space-y-4">
          <TextField
            type="text"
            register={register('username')}
            formState={formState}
            label="Username"
            placeholder="Email address or username"
          />

          <TextField
            type="password"
            register={register('password', { required: true })}
            formState={formState}
            label="Password"
            placeholder="Enter your password"
          />
        </div>
        {/* <FormError message={error} /> */}
        {/* <div className="flex justify-center">
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
          </div>
          <Button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-400 text-white"
            disabled={isLoading}
          >
            Login
          </Button> */}
        <SubmitField>Sign in</SubmitField>
      </form>
    </CardWrapper>
  );
};
