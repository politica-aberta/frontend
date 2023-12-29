"use client";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageCard from "./MessageCard";
import ReferenceCard from "./ReferenceCard";
import { Message, Reference } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChevronRightCircle } from "lucide-react";
import axios from "axios";
import MessageSkeleton from "./MessageSkeleton";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import {
  ChatPayload,
  ChatResponseValidator,
} from "@/lib/validators";

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  chatHistory: Message[];
  partyId: string | null;
}

const ChatContainer: FC<ChatContainerProps> = ({ className, ...props }) => {
  const searchParams = useSearchParams();

  const [party, setParty] = useState<string | null>(props.partyId);
  const { toast } = useToast();

  useEffect(() => {
    setParty(searchParams.get("party"));
  }, [searchParams]);

  const [input, setInput] = useState<string>("");
  const [reference, setReference] = useState<Reference | null>(null);

  const sendMessageMutation = useMutation({
    mutationFn: (payload: ChatPayload) => axios.post("/api/chat", payload),
    onSuccess: (data, variables, context) => {
      const res = ChatResponseValidator.parse(data.data);
      props.chatHistory.push(res);
      setInput("");
    },
    onError(error, variables, context) {
      props.chatHistory.pop();
      // FIXME send toast
      toast({
        title: "Houve um problema.",
        description: "Não conseguimos enviar a mensagem.",
        variant: "destructive",
      });
      console.log(error);
    },
  });

  return (
    <div className={cn("w-screen flex flex-row", className)}>
      <div className="flex flex-col justify-between py-16 mx-auto basis-1/2 max-w-3xl">
        <ScrollArea className="mb-16 h-full">
          <ul className="flex flex-col gap-4 mx-4">
            {props.chatHistory.map((msg, index) => (
              <MessageCard
                key={index}
                msg={msg.message}
                references={msg.references}
                sender={msg.role}
                setReference={setReference}
              />
            ))}
            {sendMessageMutation.isPending && <MessageSkeleton />}
          </ul>
        </ScrollArea>
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                  props.chatHistory.push({
                    role: "user",
                    message: input,
                    references: null,
                  });
                sendMessageMutation.mutate({
                  party: party!.toUpperCase(),
                  message: input,
                  previous_messages: props.chatHistory,
                });
              }
            }}
            placeholder="Type your message here."
            className="absolute bottom-0 p-4 pr-16"
          />

          <Button
            onClick={() => {
              props.chatHistory.push({
                role: "user",
                message: input,
                references: null,
              });
              sendMessageMutation.mutate({
                party: party!.toUpperCase(),
                message: input,
                previous_messages: props.chatHistory,
              });
            }}
          >
            <ChevronRightCircle className="text-primary-foreground hover:text-primary absolute bottom-8 right-8" />
          </Button>
        </div>
      </div>
      <ReferenceCard
        className=""
        reference={reference}
      />
    </div>
  );
};

export default ChatContainer;
