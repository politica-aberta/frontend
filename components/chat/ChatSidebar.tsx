"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { FC } from "react";
import CreateChatButton from "./CreateChatButton";

interface ChatSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  conversationHistory: React.ReactNode;
}

const ChatSidebar: FC<ChatSidebarProps> = ({ className, ...props }) => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(true);

  return (
    <Collapsible
      className={cn(
        "hidden lg:block h-full border-r px-10 pt-6 py-16",
        className
      )}
      open={openMenu}
      onOpenChange={setOpenMenu}
    >
      <div className="flex flex-row gap-4">
        <CollapsibleTrigger>
          <PanelLeft
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "p-2"
            )}
          />
        </CollapsibleTrigger>
        {openMenu && <CreateChatButton />}
      </div>
      <CollapsibleContent className="pt-8 space-y-4">
        {props.conversationHistory}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChatSidebar;
