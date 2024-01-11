"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";

interface SignOutButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignOutButton() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const signOutMutation = useMutation({
    mutationFn: () => axios.post("/api/auth/sign-out", {}),
    onSuccess: (data) => {
      router.refresh(); // FIXME likely a better way to do this
    },
    onError(error) {
      toast({
        title: "Houve um problema.",
        description: "Não conseguimos realizar o logout.",
        variant: "destructive",
      });
    },
  });

  return (
    <Button onClick={() => signOutMutation.mutate()} variant={"secondary"}>
      {signOutMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        "Logout"
      )}
    </Button>
  );
}

export default SignOutButton;
