import * as React from "react";
import { FC } from "react";
import { Reference } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  msg: string;
  sender: string;
  reference: Reference | null;
}

const MessageCard: FC<MessageCardProps> = ({ className, ...props }) => {
  const referencePages = props.reference?.pages.sort((a, b) => a - b);
  const color = props.sender === "user" ? "bg-muted" : "";
  const sender = props.sender === "user" ? "Utilizador" : "Assistente";

  return (
    <Card className={cn("w-full flex flex-row ", className, color)}>
      <div className="basis-4/5">
        <CardHeader>
          <CardDescription>{sender}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{props.msg}</p>
        </CardContent>
      </div>
      {props.reference && (
        <div className="basis-1/5 border-l">
          <h2 className="component-header text-description">References</h2>
          <div className="w-full flex flex-row justify-between p-6 pt-0 ">
            <div>{referencePages?.join(" ")}</div>
            <Button
              onClick={() => {}}
              className="p-2 -mt-2"
              variant={"ghost"}
              size={"icon"}
            >
              <LogIn />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MessageCard;
