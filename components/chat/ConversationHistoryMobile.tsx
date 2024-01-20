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

import { Check, ChevronsUpDown, Clock, Loader2, Plus } from "lucide-react";
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
import { parties } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Toggle } from "../ui/toggle";

interface ConversationHistoryMobileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  conversationHistory: React.ReactNode;
}

const ConversationHistoryMobile: FC<ConversationHistoryMobileProps> = ({
  className,
  ...props
}) => {
  return (
    <Sheet>
      {/* #FIXME ideally this would be <CreateChatButton/> */}
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-fit text-description",
          className
        )}
      >
        <Clock className="p-1 -ml-2" />
        <span className="">Histórico</span>
      </SheetTrigger>

      <SheetContent side="left" className="h-screen flex flex-col ">
        <SheetHeader className="pt-24 text-left">
          <SheetTitle>Histórico</SheetTitle>
          <SheetDescription className="">
            Mensagens passadas
          </SheetDescription>
        </SheetHeader>
        {props.conversationHistory}
      </SheetContent>
    </Sheet>
  );
};

export default ConversationHistoryMobile;
