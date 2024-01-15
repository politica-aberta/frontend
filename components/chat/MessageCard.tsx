import * as React from "react";
import { FC } from "react";
import { Reference } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  msg: string;
  sender: string;
  references: Reference[] | null;
  setReference: React.Dispatch<React.SetStateAction<Reference | null>>;
}

const MessageCard: FC<MessageCardProps> = ({ className, ...props }) => {
  const color = props.sender === "user" ? "bg-muted" : "";
  const sender = props.sender === "user" ? "Utilizador" : "Assistente";

  return (
    <Card className={cn("w-full flex flex-row  mr-4", className, color)}>
      <div className=" basis-11/12 flex-shrink-0">
        <CardHeader>
          <CardDescription>{sender}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap w-full">{props.msg}</p>
        </CardContent>
      </div>

      {props.references && props.references.length > 0 ? (
        <Button
          className="w-full border-l rounded-l-none h-auto"
          variant={"ghost"}
          onClick={() => {
            props.setReference(props.references?.at(0) ?? null);
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ArrowRight className="mx-auto" size={20} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver Referências</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default MessageCard;
