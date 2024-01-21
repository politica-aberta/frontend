"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { LoginUserPayload, LoginUserValidator } from "@/lib/validators";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { PopoverClose } from "@radix-ui/react-popover";
import { useMutation } from "@tanstack/react-query";
import OAuthSignInButton from "./OAuthSignInButton";

interface LoginUserFormProps {
  onClose?: () => void;
}

export function LoginUserForm({onClose}: LoginUserFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginUserPayload) =>
      axios.post("/api/auth/sign-in", payload),
    onSuccess: (data, variables, context) => {
      router.refresh(); // FIXME likely a better way to do this
    },
    onError(error) {
      toast({
        title: "Houve um problema.",
        description: "Não conseguimos realizar o login.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: LoginUserPayload) {
    loginMutation.mutate(values);
  }

  const form = useForm<LoginUserPayload>({
    resolver: zodResolver(LoginUserValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "default" })}>
        Login
      </PopoverTrigger>

      <PopoverContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {loginMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-sm text-muted-foreground text-center mt-4">
          <OAuthSignInButton provider="Google" />
        </div>

        <div className="text-sm text-muted-foreground text-center mt-4">
          Don't have an account?
          <PopoverClose
            className="pl-1 underline text-foreground"
            onClick={() => {
              router.push("/auth/sign-up")
              onClose?.();
            }}
          >
            Sign-up.
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
