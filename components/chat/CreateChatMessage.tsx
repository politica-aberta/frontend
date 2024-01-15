"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { parties } from "@/lib/constants";
import React from "react";
import {
  CreateConversationPayload,
  CreateConversationResponse,
  CreateConversationResponseValidator,
} from "@/lib/validators";
import axios, { AxiosError } from "axios";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";

interface CreateChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {}

const CreateChatMessage: FC<CreateChatMessageProps> = ({
  className,
  ...props
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const createChatMutation = useMutation({
    mutationFn: (payload: CreateConversationPayload) =>
      axios.post<CreateConversationResponse>("/api/chat/create", payload),
    onSuccess: (data, variables, context) => {
      const { id, party } = CreateConversationResponseValidator.parse(
        data.data
      );
      router.replace(`/chat?id=${id}&party=${party}`);
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
    <div className={cn("", className)}>
      <Card>
        <CardHeader>
          <CardDescription>Assistente</CardDescription>
        </CardHeader>
        <CardContent>
          Olá! Estou aqui para te ajudar a escolher um partido político que
          represente os teus ideais. Descobre mais com os botões abaixo.
          <ToggleGroup
            className="pt-6 flex flex-wrap overflow-auto gap-4 justify-normal"
            type="single"
          >
            {parties.map((party) => (
              <ToggleGroupItem
                variant={"outline"}
                size={"sm"}
                key={party.id}
                value={party.id}
                onClick={() => {
                  createChatMutation.mutate({
                    party: party.id,
                  });
                }}
              >
                {party.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardDescription>Assistente</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Também dispomos de uma opção para comparar partidos. Podes
            utilizá-la seguindo o botão abaixo.
          </p>
          <Button
            className="mt-6"
            variant={"outline"}
            onClick={() => {
              createChatMutation.mutate({
                party: "multi",
              });
            }}
          >
            Comparação
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateChatMessage;
