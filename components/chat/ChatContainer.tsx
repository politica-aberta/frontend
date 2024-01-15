"use client";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRightCircle } from "lucide-react";

import MessageCard from "@/components/chat/MessageCard";
import MessageSkeleton from "@/components/chat/MessageSkeleton";
import ReferenceCard from "@/components/chat/ReferenceCard";

import { Message, Reference } from "@/lib/types";
import { ChatPayload, MessageValidator } from "@/lib/validators";

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  chatHistory: Message[];
  chatId: string;
  partyId: string;
}

const ChatContainer: FC<ChatContainerProps> = ({ className, ...props }) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [input, setInput] = useState<string>("");
  const [reference, setReference] = useState<Reference | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  useEffect(() => {
    setChatHistory(
      !props.chatHistory || props.chatHistory.length === 0
        ? [
            {
              role: "assistant",
              message: "Olá! Como posso ser útil?",
              references: null,
            },
          ]
        : props.chatHistory
    );
    setReference(null);
  }, [searchParams]);

  const sendMessageMutation = useMutation({
    mutationFn: (payload: ChatPayload) => {
      console.log(payload);
      setChatHistory(
        chatHistory.concat({
          role: "user",
          message: input,
          references: null,
        })
      );
      return axios.post("/api/chat", payload);
    },
    onSuccess: (data) => {
      const res = MessageValidator.parse(data.data);
      setChatHistory(chatHistory.concat(res));
      setInput("");
    },
    onError(error: AxiosError) {
      if (error.response?.status === 403) {
        toast({
          title: "Houve um problema.",
          description:
            "Excedeste o limite de utilizacão. Contacta os admins por favor.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Houve um problema.",
          description: "Não conseguimos enviar a mensagem.",
          variant: "destructive",
        });
      }
      // FIXME remove last message from the chat
      setChatHistory(chatHistory.slice(0, -1));
    },
  });


  return (
    <div className={cn("w-screen flex flex-row", className)}>
      {/* {<ChatNotFoundDialog open={props.invalidParams} />} */}
      <div className="flex flex-col justify-between py-8 mx-auto basis-1/2 max-w-3xl">
        <ScrollArea className="mb-16 h-full pr-8">
          <ul className="flex flex-col gap-4 ">
            {chatHistory &&
              chatHistory.map((msg, index) => (
                <MessageCard
                  key={index}
                  sender={msg.role}
                  msg={msg.message}
                  references={msg.references}
                  setReference={setReference}
                />
              ))}
            {sendMessageMutation.isPending && <MessageSkeleton />}
          </ul>
        </ScrollArea>
        <div className="relative mr-8">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                if (!props.partyId) {
                  toast({
                    title: "Houve um problema.",
                    description: "Não conseguimos enviar a mensagem.",
                    variant: "destructive",
                  });
                  return;
                }

                sendMessageMutation.mutate({
                  id: props.chatId,
                  party: props.partyId.toLowerCase(),
                  message: input,
                  previous_messages: chatHistory,
                });
              }
            }}
            placeholder="Type your message here."
            className="absolute bottom-0 p-4 pr-16"
          />

          <Button
            onClick={() => {
              if (!props.partyId) {
                console.log();
                toast({
                  title: "Houve um problema.",
                  description: "Não conseguimos enviar a mensagem.",
                  variant: "destructive",
                });
                return;
              }

              sendMessageMutation.mutate({
                id: props.chatId,
                party: props.partyId.toLowerCase(),
                message: input,
                previous_messages: chatHistory,
              });
            }}
          >
            <ChevronRightCircle className="text-primary-foreground hover:text-primary absolute bottom-8 right-8" />
          </Button>
        </div>
      </div>
      {reference && <ReferenceCard reference={reference} />}
    </div>
  );
};

export default ChatContainer;
