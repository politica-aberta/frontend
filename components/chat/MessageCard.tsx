import * as React from "react";
import { FC } from "react";
import { Reference } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, ArrowDown } from "lucide-react";
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
  setOpenMobileReference: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageCard: FC<MessageCardProps> = ({ className, ...props }) => {
  const color = props.sender === "user" ? "bg-muted" : "";
  const sender = props.sender === "user" ? "Utilizador" : "Assistente";

  // consistent with lg: modifier in tailwind
  const isMobile = window.innerWidth < 1024;

  return (
    <Card className={cn("w-full lg:flex lg:flex-row ", className, color)}>
      <div className="lg:basis-11/12 lg:flex-shrink-0">
        <CardHeader className="">
          <CardDescription className="flex flex-row justify-between">
            {sender}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <p className="whitespace-pre-wrap w-full">{props.msg}</p>
        </CardContent>
      </div>
      <div className="basis-full">
        {props.references && props.references.length > 0 ? (
          <Popover>
            <PopoverTrigger className="lg:border-l lg:hover:bg-muted lg:h-full lg:mx-auto w-full">
              <div
                className={cn(
                  buttonVariants(),
                  "lg:hidden flex flex-row justify-center mx-6 mb-6 "
                )}
              >
                <p>Ver referências</p>
                <ArrowDown className="ml-2" />
              </div>
              <ArrowRight className="hidden lg:block mx-auto" />
            </PopoverTrigger>
            <PopoverContent side={isMobile ? "bottom" : "right"} className="">
              <h2 className="pr-8 font-semibold ">Documentos utilizados</h2>
              <ul className="pt-2 flex flex-col space-y-2">
                {props.references.map((reference, index) => (
                  <Button
                    key={index}
                    className=""
                    variant={"secondary"}
                    onClick={() => {
                      props.setReference(reference);
                      isMobile && props.setOpenMobileReference(true);
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