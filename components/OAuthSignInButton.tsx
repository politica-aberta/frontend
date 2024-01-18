"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const OAuthSignInButton = (props: any) => {
  const { toast } = useToast();
  const provider = props.provider;

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: () =>
      axios.post("/api/auth/get-sign-in-provider", {prov: provider.toLowerCase()}),
    onSuccess: (data) => {
      router.push(data.data.body); // FIXME likely a better way to do this
    },
    onError(error) {
      console.log(error);
      toast({
        title: "Houve um problema.",
        description: "Não conseguimos redirecionar para a página requisitada.",
        variant: "destructive",
      });
    },
  });

  return (
    <Button className="w-full" onClick={() => loginMutation.mutate(provider)}>
      {loginMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        `Sign in with ${provider}`
      )}
    </Button>
  );
};

export default OAuthSignInButton;