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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Toggle } from "../ui/toggle";

interface ChatSidebarMobileProps extends React.HTMLAttributes<HTMLDivElement> {
  conversationHistory: React.ReactNode;
}

const ChatSidebarMobile: FC<ChatSidebarMobileProps> = ({
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
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

      <SheetContent side="left">
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
            <div className="">
              <Popover open={openSearch} onOpenChange={setOpenSearch}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSearch}
                    className="w-full justify-between"
                  >
                    {value
                      ? parties.find((party) => party.id === value)?.title
                      : "Escolhe o teu partido..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Escolhe o teu partido..." />
                    <CommandEmpty>No party found.</CommandEmpty>
                    <CommandGroup>
                      {parties.map((party, index) => (
                        <CommandItem
                          key={index}
                          value={party.id}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpenSearch(false);
                            setPressed(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === party.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {party.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Toggle
              pressed={pressed}
              className="w-full"
              variant="outline"
              onClick={() => {
                setPressed(!pressed);
                setValue("multi");
              }}
            >
              Comparação
            </Toggle>

            <Button
              disabled={value === ""}
              className="w-full"
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
        </div>

        <div className="pt-16">{props.conversationHistory}</div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebarMobile;
