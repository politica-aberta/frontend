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

interface CreateChatButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

const CreateChatButton: FC<CreateChatButtonProps> = ({
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  const createChatMutation = useMutation({
    mutationFn: (payload: CreateConversationPayload) =>
      axios.post("/api/chat/create", payload),
    onSuccess: (data, variables, context) => {
      const {id, party} = CreateConversationResponseValidator.parse(data.data);
      router.replace(`/chat?id=${id}&party=${party}`);
      setOpen(false);
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={buttonVariants({ variant: "default" })}>
        <Plus className="p-1 -ml-2" />
        <span>Novo Chat</span>
      </PopoverTrigger>
      <PopoverContent
        className="p-6 space-y-4"
        side="right"
        sideOffset={10}
        align="start"
        avoidCollisions={false}
      >
        <div className="component-header p-0">
          <h1 className="text-title">Criar Conversa</h1>
          <h2 className="text-description">
            Aproxima-te do teu partido
          </h2>
        </div>
        <div className="grid w-full items-center gap-4 pt-4  ">
          <div className="flex flex-col space-y-1.5">
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
                      : "Choose your party..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Choose your party..." />
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
          </div>
        </div>
        <Button
          disabled={value === ""}
          className="w-full"
          type="submit"
          onClick={() => {
            createChatMutation.mutate({party: value});
          }}
        >
          {createChatMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default CreateChatButton;
