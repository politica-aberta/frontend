import * as React from "react";
import { FC } from "react";
import { Reference } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRightCircle, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MessageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  msg: string;
  sender: string;
  setReferences: React.Dispatch<React.SetStateAction<Reference[] | null>>;
  references: Reference[] | null;
}

const MessageCard: FC<MessageCardProps> = ({ className, ...props }) => {
  const color = props.sender === "user" ? "bg-muted" : "";
  const sender = props.sender === "user" ? "Utilizador" : "Assistente";

  return (
    <Card className={cn("w-full flex flex-row ", className, color)}>
      <div className="basis-5/6 flex-shrink-0">
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
            props.setReferences(props.references);
          }}
        >
          <ArrowRightCircle className="mx-auto" size={32} />
        </Button>
      ) : null}
    </Card>
  );
};

export default MessageCard;
