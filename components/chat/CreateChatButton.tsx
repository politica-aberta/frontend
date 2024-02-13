"use client";
import React, { FC } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  CreateConversationPayload,
  CreateConversationResponseValidator,
} from "@/lib/validators";

import { parties } from "@/lib/constants";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Toggle } from "../ui/toggle";

interface CreateChatButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

const CreateChatButton: FC<CreateChatButtonProps> = ({
  className,
  ...props
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const createChatMutation = useMutation({
    mutationFn: (payload: CreateConversationPayload) =>
      axios.post("/api/chat/create", payload),
    onSuccess: (data, variables, context) => {
      const { id, party } = CreateConversationResponseValidator.parse(
        data.data
      );
      router.replace(`/chat?id=${id}`);
    },
    onError(error: AxiosError) {
      if (error.response?.status === 401) {
        toast({
          title: "Houve um problema.",
          description: "Tens que fazer login primeiro.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Houve um problema.",
          description: "Não conseguimos criar a conversa.",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <Button
    className="w-32"
      onClick={() => {
        createChatMutation.mutate({ party: "multi" });
      }}
    >
      {createChatMutation.isPending ? (
        <Loader2 className="animate-spin mr-3 w-full" />
      ) : (
        <>
          {" "}
          <Plus className="p-1 -ml-2" />
          <span>Novo Chat</span>
        </>
      )}
    </Button>
  );
};

export default CreateChatButton;
