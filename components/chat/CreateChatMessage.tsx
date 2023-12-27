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
import { CreateConversationPayload } from "@/lib/validators";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface CreateChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {}

const CreateChatMessage: FC<CreateChatMessageProps> = ({
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const createChat = async (value: string) => {
    const payload: CreateConversationPayload = {
      party: value,
    };

    setIsLoading(true);
    // FIXME use react query for this

    try {
      const {
        data: { id, party },
      } = await axios.post("/api/chat/create", payload);
      router.replace(`/chat?id=${id}&party=${party}`);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        toast({
          title: "Houve um problema.",
          description: "Tens que fazer login primeiro.",
          variant: "destructive",
        });
      } else if (error.response.status === 500) {
        toast({
          title: "Houve um problema.",
          description: "Não conseguimos criar a conversa.",
          variant: "destructive",
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <Card className={cn("", className)}>
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
                createChat(party.id);
              }}
            >
              {party.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};

export default CreateChatMessage;
