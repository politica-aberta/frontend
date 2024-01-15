"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CreateUserPayload, CreateUserValidator } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CreateUserForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  const createUserMutation = useMutation({
    mutationFn: (payload: CreateUserPayload) =>
      axios.post("/api/auth/sign-up", payload),
    onSuccess: (data, variables, context) => {
      toast({
        title: "Confirmação por email",
        description: "Verifica a tua conta seguindo o link que enviámos.",
      });
    },
    onError(error: AxiosError) {
      if (error.response?.status === 400) {
        toast({
          title: "Houve um problema.",
          description: "Já tens um login ativo.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Houve um problema.",
          description: "Não te conseguimos registar.",
          variant: "destructive",
        });
      }
    }
  });

  async function onSubmit(data: CreateUserPayload) {
    createUserMutation.mutate(data);
  }

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(CreateUserValidator),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <FormDescription></FormDescription>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="O teu nome" {...field} />
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {createUserMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateUserForm;
