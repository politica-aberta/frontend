"use client";
import { cn } from "@/lib/utils";
import { FC } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";

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
import { Label } from "@radix-ui/react-label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { parties } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Toggle } from "../ui/toggle";

interface ChatSidebarMobileProps extends React.HTMLAttributes<HTMLDivElement> {
  conversationHistory: React.ReactNode;
}

const ChatSidebarMobile: FC<ChatSidebarMobileProps> = ({
  className,
  ...props
}) => {
  const [pressed, setPressed] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

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
    <Sheet>
      {/* #FIXME ideally this would be <CreateChatButton/> */}
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-fit",
          className
        )}
      >
        <Plus className="p-1 -ml-2" />
        <span>Novo Chat</span>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="h-screen flex flex-col justify-between"
      >
        <div>
          <SheetHeader className="pt-8">
            <SheetTitle>
              Criar Conversa
              <SheetDescription className="">
                Aproxima-te do teu partido
              </SheetDescription>
            </SheetTitle>
          </SheetHeader>

          <div className=" w-full items-center gap-4 pt-4  ">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="party">Partido</Label>

              <Select
                value={value}
                onValueChange={(value) => {
                  setValue(value);
                  setPressed(false);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolhe o teu partido" />
                </SelectTrigger>
                <SelectContent>
                  {parties.map((party) => (
                    <SelectItem key={party.id} value={party.id}>
                      {party.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Toggle
                pressed={pressed}
                onPressedChange={setPressed}
                className="w-full"
                variant="outline"
                onClick={() => {
                  setValue("multi");
                }}
              >
                Comparação
              </Toggle>
            </div>
          </div>
        </div>

        <div />

        <div>
          <Collapsible>
            <CollapsibleTrigger
              className={buttonVariants({ variant: "outline" })}
            >
              Conversas Passadas
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              {props.conversationHistory}
            </CollapsibleContent>
          </Collapsible>

          <Button
            disabled={value === ""}
            className="w-full mt-8 mb-32"
            type="submit"
            onClick={() => {
              createChatMutation.mutate({ party: value });
            }}
          >
            {createChatMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Continuar"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebarMobile;
