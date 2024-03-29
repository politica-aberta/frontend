"use client";
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRightCircle } from "lucide-react";

import MessageCard from "@/components/chat/MessageCard";
import MessageSkeleton from "@/components/chat/MessageSkeleton";
import ReferenceCard from "@/components/chat/ReferenceCard";

import { Message, Reference } from "@/lib/types";
import { ChatPayload, MessageValidator } from "@/lib/validators";
import ReferenceModal from "./ReferenceModal";
import ConversationHistoryMobile from "./ConversationHistoryMobile";
import ChatExamples from "./ChatExamples";
import { useRouter } from "next/navigation";
import CreateChatButton from "./CreateChatButton";

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  chatHistory: Message[];
  chatId: string;
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

  const router = useRouter();

  useEffect(() => {
    setChatHistory(
      !props.chatHistory || props.chatHistory.length === 0
        ? [
            {
              role: "assistant",
              message:
                "Olá! Estou aqui para te responder a dúvidas e questões sobre os programas dos partidos políticos portugueses.",
              references: null,
            },
          ]
        : props.chatHistory
    );
    setReference(null);
  }, [searchParams]);

  const sendMessageMutation = useMutation({
    mutationFn: (payload: ChatPayload) => {
      const inp = input;
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
      router.replace(`/chat?id=${data.data.id}`);
      const message = data.data.reply;
      const res = MessageValidator.parse(message);
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

  const submitMessage = () => {
    if (!sendMessageMutation.isPending && input.length > 0) {
      sendMessageMutation.mutate({
        id: props.chatId,
        message: input,
        previous_messages: chatHistory.map(({ references, ...rest }) => ({
          ...rest,
          references: null, // Drop references before sending messages
        })),
      });
    }
  };

  return (
    <div className={cn("w-screen flex flex-row ", className)}>
      <div className="flex flex-col justify-between py-8 md:mx-auto mx-5 w-full md:basis-1/2 md:max-w-3xl">
        <ScrollArea className="lg:pr-8 w-full mb-6 ">
          <div className="flex flex-row gap-4 mb-4">
            <CreateChatButton className="lg:hidden" />
            <ConversationHistoryMobile
              className="lg:hidden"
              conversationHistory={props.conversationHistory}
            />
          </div>
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
            {sendMessageMutation.isPending && (
              <MessageSkeleton
                alertMessage={
                  "As respostas  podem demorar até 1 minuto a ser geradas."
                }
              />
            )}
          </ul>
        </ScrollArea>
        <div>
          {chatHistory.length <= 1 && (
            <ChatExamples className="pb-4 lg:mr-8" setInput={setInput} />
          )}

          <div className="relative lg:mr-8 ">
            <Textarea
              value={sendMessageMutation.isPending ? "" : input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sendMessageMutation.isPending}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitMessage();
                }
              }}
              placeholder="Escreve aqui a tua mensagem."
              className=" p-4 pr-16"
            />

            <ChevronRightCircle
              className={`absolute bottom-8 right-8 bg-background text-secondary hover:bg-background ${
                sendMessageMutation.isPending || input.length <= 0
                  ? ""
                  : "hover:text-primary cursor-pointer"
              }`}
              onClick={() => {
                submitMessage();
              }}
            />
          </div>
        </div>
      </div>
      {reference && (
        <>
          <ReferenceCard className="hidden lg:block" reference={reference} />
          <div className="lg:hidden">
            <ReferenceModal
              reference={reference}
              open={openMobileReference}
              setOpen={setOpenMobileReference}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatContainer;
