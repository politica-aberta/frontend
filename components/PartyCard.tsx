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

interface PartyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  party: Party;
}

const PartyCard: FC<PartyCardProps> = ({ className, party, ...props }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="flex flex-col justify-between text-card bg-card-foreground h-48 w-72 text-left">
          <CardHeader>
            <CardTitle>{party.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              className=""
              src={party.logo}
              alt={`${party.id}-logo`}
            />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className=""></DialogContent>
    </Dialog>
  );
};

export default PartyCard;
