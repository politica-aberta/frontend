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
import { ChatPayload } from "@/lib/validators";
import axios from "axios";
import MessageSkeleton from "./MessageSkeleton";

const createMessage = (text: string, sender: string): Message => ({
  text,
  sender,
  reference: null,
});

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  chatHistory: Message[];
  partyId: string | null;
}

const ChatContainer: FC<ChatContainerProps> = ({ className, ...props }) => {
  const searchParams = useSearchParams();

  const [party, setParty] = useState<string | null>(props.partyId);

  useEffect(() => {
    setParty(searchParams.get("party"));
  }, [searchParams]);

  const [input, setInput] = useState<string>("");
  const [reference, setReference] = useState<Reference>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function sendMessage() {
    console.log(input);

    props.chatHistory.push(createMessage(input, "user"));

    setIsLoading(true);

    const payload: ChatPayload = {
      political_party: party!.toUpperCase(),
      chat: input,
    };

    const { data } = await axios.post("/api/chat", payload);

    props.chatHistory.push(createMessage(data.text, data.sender));
    setReference(data.reference);
    setIsLoading(false);
    setInput("");
  }

  return (
    <div className={cn("w-screen flex flex-row", className)}>
      <div className="flex flex-col justify-between py-16 mx-auto basis-1/2 max-w-3xl">
        <ScrollArea className="mb-16 h-full">
          <ul className="flex flex-col gap-4 mx-4">
            {props.chatHistory.map((msg, index) => (
              // FIXME also add reference button
              <MessageCard
                key={index}
                msg={msg.text}
                reference={msg.reference}
                sender={msg.sender}
              />
            ))}
            {isLoading && <MessageSkeleton />}
          </ul>
        </ScrollArea>
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message here."
            className="absolute bottom-0 p-4 pr-16"
          />

          <Button onClick={sendMessage}>
            <ChevronRightCircle className="text-primary-foreground hover:text-primary absolute bottom-8 right-8" />
          </Button>
        </div>
      </div>
      <ReferenceCard
        className=""
        partyId={party as string}
        pages={reference?.pages}
      />
    </div>
  );
};

export default ChatContainer;
