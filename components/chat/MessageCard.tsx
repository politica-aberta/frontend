import * as React from "react";
import { FC } from "react";
import { Reference } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { parties } from "@/lib/constants";

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
    <Card className={cn("w-full flex flex-row ", className, color)}>
      <div className=" lg:basis-11/12 lg:flex-shrink-0">
        <CardHeader className="">
          <CardDescription className="flex flex-row justify-between">
            {sender}
            {props.references && props.references.length > 0 ? (
              <Popover>
                <PopoverTrigger
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "md:hidden w-full flex text-description"
                  )}
                >
                  <p>Ver referências </p>
                  <ArrowUpRight className="ml-2" />
                </PopoverTrigger>
                <PopoverContent className=" w-fit ">
                  <h2 className="pr-8 font-semibold ">Documentos utilizados</h2>
                  <ul className="pt-2 flex flex-col space-y-2">
                    {props.references.map((reference, index) => (
                      <Button
                        key={index}
                        className=""
                        variant={"secondary"}
                        onClick={() => {
                          props.setReference(reference);
                        }}
                      >
                        {`${reference.party} - ${parties.find(
                          (party) => party.id === reference.party.toLowerCase()
                        )?.subtitle}`}
                      </Button>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap w-full">{props.msg}</p>
        </CardContent>
      </div>
      <div className="hidden md:flex w-full">
        {props.references && props.references.length > 0 ? (
          <Popover>
            <PopoverTrigger className="grow border-l hover:bg-muted ">
              {/* #FIXME use state and add X icon 
            <ArrowRight className="mx-auto data-[state=open]:hidden" /> */}
              <ArrowRight className="mx-auto " />
            </PopoverTrigger>
            <PopoverContent side="right" sideOffset={20} className=" w-fit ">
              <h2 className="pr-8 font-semibold ">Documentos utilizados</h2>
              <ul className="pt-2 flex flex-col space-y-2">
                {props.references.map((reference, index) => (
                  <Button
                    key={index}
                    className=""
                    variant={"secondary"}
                    onClick={() => {
                      props.setReference(reference);
                    }}
                  >
                    {`${reference.party} - ${parties.find(
                      (party) => party.id === reference.party.toLowerCase()
                    )?.subtitle}`}
                  </Button>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default MessageCard;
