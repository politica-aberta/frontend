import { Party } from "@/lib/types";
import { FC } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface PartyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  party: Party;
}

const PartyCard: FC<PartyCardProps> = ({ className, party, ...props }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full bg-muted dark:bg-white hover:bg-muted-foreground dark:hover:bg-muted dark:border rounded-md h-16 grid place-content-center   ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Image
          className={party.size}
          height={party.height}
          width={party.width}
          src={party.logo}
          alt={`${party.id}-logo`}
        />
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[48rem] p-8 ">
        <div id="head">
          <h1 className="text-title">{party.title}</h1>
          <div className="mt-4 h-[32rem] border rounded-md p-16 bg-white grid place-content-center">
            <Image src={party.logo} alt="party logo"></Image>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold leading-none">
            Documentos disponiveis
          </h3>
          {/* #FIXME map over docs whenever >1*/}
          <ul className="pl-4 pt-2 list-disc">
            <li className=" ">
              <Link className=" underline " href={party.path} target="_blank">
                {party.subtitle}
              </Link>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartyCard;
