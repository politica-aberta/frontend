"use client";
import { cn } from "@/lib/utils";
import { FC, SetStateAction, useEffect, useState } from "react";
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

import ReferenceModal from "./ReferenceModal";
import ChatSidebarMobile from "./ChatSidebarMobile";

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  chatHistory: Message[];
  chatId: string;
  partyId: string;
  conversationHistory: React.ReactNode;
}

const ChatContainer: FC<ChatContainerProps> = ({ className, ...props }) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [input, setInput] = useState<string>("");
  const [reference, setReference] = useState<Reference | null>(null);
  const [openMobileReference, setOpenMobileReference] =
    useState<boolean>(false);
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
    <div className={cn("w-screen flex flex-row ", className)}>
      <div className="flex flex-col  justify-between py-8 md:mx-auto mx-5 w-full md:basis-1/2 md:max-w-3xl">
        <ScrollArea className="mb-16 h-full lg:pr-8 w-full">
          <ChatSidebarMobile
            conversationHistory={props.conversationHistory}
            className="lg:hidden mb-4"
          />
          <ul className="flex flex-col gap-4 w-full">
            {chatHistory &&
              chatHistory.map((msg, index) => (
                <MessageCard
                  key={index}
                  sender={msg.role}
                  msg={msg.message}
                  references={msg.references}
                  setReference={setReference}
                  setOpenMobileReference={setOpenMobileReference}
                />
              ))}
            {sendMessageMutation.isPending && <MessageSkeleton />}
          </ul>
        </ScrollArea>
        <div className="relative lg:mr-8">
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
            placeholder="Escreve aqui a tua mensagem."
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
      {reference && (
        <>
          <ReferenceCard className="hidden md:block" reference={reference} />
          <div className="lg:hidden">
            <ReferenceModal
              reference={reference}
              open={openMobileReference}
              setOpen={setOpenMobileReference}
            />
          </div>
        </>
      )}

      {/* <Modal contentLabel={reference?.party} ariaHideApp={true} isOpen={!!reference} onRequestClose={() => setReference(null)} ><ReferenceModal reference={reference}/></Modal> */}
    </div>
  );
};

export default ChatContainer;
