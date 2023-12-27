"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface SignOutButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignOutButton() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function handleSignOut() {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/auth/sign-out", {});
      router.refresh();
    } catch (error) {
      toast({
        title: "Houve um problema.",
        description: "Não te conseguimos fazer logout. Tenta outra vez.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={handleSignOut} variant={"secondary"}>
      {isLoading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
}

export default SignOutButton;
